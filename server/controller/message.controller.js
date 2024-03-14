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
    
            res.json(messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    };

    create = async (req, res) => {
        try {
            const { title, dialogid, authorid } = req.body;
    
            // Вставляем новое сообщение в таблицу messages с дополнительными значениями по умолчанию
            const newMessage = await db.query(
                'INSERT INTO messages (title, dialogId, authorid, unread, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [title, dialogid, authorid, false, new Date()]
            );
    
            // Получаем данные о диалоге
            const dialog = await db.query('SELECT * FROM dialogs WHERE id = $1', [dialogid]);
    
            // Отправляем сообщение через сокет
            this.io.emit('SERVER:NEW_MESSAGE', {
                dialog: dialog.rows[0],
                newMessage: newMessage.rows[0]
            });
    
            // Отправляем ответ клиенту с данными о сообщении и диалоге
            res.json({
                dialog: dialog.rows[0],
                newMessage: newMessage.rows[0]
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
        const messageId = req.params.id;

        // Проверяем существование сообщения
        const existingMessage = await db.query('SELECT * FROM messages WHERE id = $1', [messageId]);

        if (!existingMessage) {
            return res.status(404).json({
                message: 'Message not found',
            });
        }

        // Удаляем сообщение
        await db.query('DELETE FROM messages WHERE id = $1', [messageId]);

        res.json({
            message: 'Message deleted',
        });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
    };

    

}

module.exports = MessageController;