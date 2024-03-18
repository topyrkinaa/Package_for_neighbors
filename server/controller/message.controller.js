const db = require('../db')

class MessageController {
    constructor(io) {
        this.io = io;
    }
    io;
 
    index = async(req, res)=> {
        try {
            const dialogId = req.query.dialog;
    
            // Получаем сообщения для заданного диалога из таблицы messages
            const messages = await db.query('SELECT * FROM messages WHERE dialogId = $1', [dialogId]);
    
            if (messages.length === 0) {
                return res.status(404).json({
                    message: 'Messages not found'
                });
            }
            
            const messagesWithUsers = await Promise.all(messages.rows.map(async (message) => {
                const user = await db.query('SELECT * FROM users WHERE id = $1', [message.authorid]);
                const dialog = await db.query('SELECT * FROM dialogs WHERE id = $1', [message.dialogid]);
                return {
                    id: message.id,
                    user: user.rows[0],
                    dialog: dialog.rows[0],
                    text: message.title,
                    unread: message.unread,
                    created_at: message.created_at
                };
            })); 

            return res.json(messagesWithUsers);
        } catch (error) {
            console.error('Error fetching messages:', error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    };

    create = async (req, res) => {
        try {
            const { title, dialogid } = req.body;
            const email = req.user.data // получаем email по токену
            const user = await db.query(`SELECT * FROM users WHERE email = '${email}' `)

            const newMessage = await db.query(
                'INSERT INTO messages (title, dialogId, authorid, unread, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [title, dialogid, user.rows[0].id, false, new Date()]
            );

            await db.query('UPDATE dialogs SET lastmessageid = $1 WHERE id =$2' , [newMessage.rows[0].id, dialogid] )

            const dialog = await db.query('SELECT * FROM dialogs WHERE id = $1', [dialogid]);
    
            this.io.emit('SERVER:NEW_MESSAGE', {
                
                id: newMessage.rows[0].id,
                unread: newMessage.rows[0].unread,
                text: newMessage.rows[0].title,
                dialog: dialog.rows[0],
                user: user.rows[0],
                created_at:  newMessage.rows[0].created_at,
            });
    
            res.json({
                id: newMessage.rows[0].id,
                unread: newMessage.rows[0].unread,
                text: newMessage.rows[0].title,
                dialog: dialog.rows[0],
                user: user.rows[0],
                created_at:  newMessage.rows[0].created_at,
            });
        } catch (error) {
            console.error('Error creating message:', error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    };

    delete = async(req, res) => {
    try {
        const messageId = req.query.id;
        const email = req.user.data
        const user = await db.query(`SELECT * FROM users WHERE email = '${email}' `)


        // Проверяем существование сообщения
        const existingMessage = await db.query('SELECT * FROM messages WHERE id = $1', [messageId]);
        if (!existingMessage.rows[0]) {
            return res.status(404).json({ 
                status: 'error',
                message: 'Message not found',
            });
        }
        
        if (user.rows[0].id === existingMessage.rows[0].authorid) {

            const dialogid = existingMessage.rows[0].dialogid;
            const dialogs = await db.query('SELECT * FROM dialogs WHERE id = $1', [dialogid]);

            if (parseInt(dialogs.rows[0].lastmessageid) === parseInt(messageId)) {

                const previousMessage = await db.query('SELECT * FROM messages WHERE dialogid = $1 AND id < $2 ORDER BY id DESC LIMIT 1', [dialogid, messageId]);
                
                if (previousMessage.rows.length > 0) {
                     // Обновить lastmessageid в записи dialogs

                    await db.query('UPDATE dialogs SET lastmessageid = $1 WHERE id = $2', [previousMessage.rows[0].id, dialogid]);
                } else {
                    // Если предыдущее сообщение не найдено, установить lastmessageid в NULL
                    db.query('DELETE FROM dialogs WHERE id = $1 ', [dialogid]);
                }
            }
            db.query('DELETE FROM messages WHERE id = $1', [messageId]);
            return res.json({
                status: 'success',
                message: 'Message deleted',
            });
        } else {
            return res.json({ 
                status: 'error',
                message: 'Вы не являетесь владельцем сообщения',
            });
        }

    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
    };

    

}

module.exports = MessageController;