const db = require('../db')

class DialogController {
    io;
    constructor(io) {
    this.io = io;
  }

    /*
    вот тут я получаю только данные о диалоге, это может быть нужно
    
    ниже я получаю данные о диалоге, авторе, партнеру

    async index(req, res) {
        try {
            const authorID = req.params.id;
            const dialogs = await db.query('SELECT * FROM dialogs WHERE authorId = $1', [authorID]);
            if (dialogs.length === 0) {
                return res.status(404).json({
                    message: 'Dialogs not found',
                });
            }
            res.json(dialogs);
        } catch (error) {
          console.error(error)
          res.status(500).json({ message: 'Internal Server Error', error: error.message })
  
        }
    };
     */

    async index(req, res) {
        try {
            const emailID = req.user.data
            const user = await db.query(`SELECT * FROM users WHERE email = '${emailID}' `);
            
            const dialogs = await db.query('SELECT * FROM dialogs WHERE authorId = $1', [user.rows[0].id]);
    
            if (dialogs.length === 0) {
                return res.status(404).json({
                    message: 'Dialogs not found',
                });
            }
    
            
    
            // Для каждого диалога получаем полные данные о пользователях
            const dialogsWithUsers = await Promise.all(dialogs.rows.map(async (dialog) => {
                const author = await db.query('SELECT * FROM users WHERE id = $1', [dialog.authorid]);
                const partner = await db.query('SELECT * FROM users WHERE id = $1', [dialog.partnerid]);
                const lastMessage = await db.query('SELECT * FROM messages WHERE id = $1', [dialog.lastmessageid]);
                return {
                    id: dialog.id,
                    author: author.rows[0],
                    partner: partner.rows[0],
                    lastMessage: lastMessage.rows[0],
                };
            })); 
    
            return res.json(dialogsWithUsers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }

 

    create = async (req, res) =>{
        try {

            const { partnerid, title  } = req.body;
            const emailID = req.user.data;
            const user = await db.query(`SELECT * FROM users WHERE email = '${emailID}' `);
            // Проверяем, существует ли уже диалог между автором и партнером
            const existingDialog = await db.query(
                `SELECT EXISTS (SELECT 1 FROM dialogs WHERE (authorId = '${user.rows[0].id}' AND partnerId = '${partnerid}') OR (authorId = '${partnerid}' AND partnerId = '${user.rows[0].id}')) AS it_does_exist; `)
            ;
    
            if (existingDialog.rows[0].it_does_exist) {
                return res.status(400).json({ message: `Dialog already exists` })
            } 
    
            // Вставляем новый диалог в таблицу dialogs
            const newDialog = await db.query(
                `INSERT INTO dialogs(authorId, partnerId) VALUES ('${user.rows[0].id}', '${partnerid}') RETURNING *`
            );
                
            // Вставляем новое сообщение в таблицу messages для установки lastMessage
            const newMessage = await db.query(
            'INSERT INTO messages (title, dialogid, authorid, unread, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, newDialog.rows[0].id, user.rows[0].id, false, new Date()]
        );

        // Обновляем lastMessage в созданном диалоге
        await db.query(
            'UPDATE dialogs SET lastMessageId = $1 WHERE id = $2',
            [newMessage.rows[0].id, newDialog.rows[0].id]
        );

        res.json(newDialog);

        } catch (error) {
            console.error('Error creating dialog:', error);
            res.status(500).json({
                message: 'Internal server error',
            });
        }
    };


    deleteDialog = async (req, res) => {
        try {
            const id = req.params.id;
    
            // Удаляем диалог по id из таблицы dialogs
            const deletedDialog = await db.query('DELETE FROM dialogs WHERE id = $1 RETURNING *', [id]);
    
            if (deletedDialog) {
                res.json({
                    message: 'Dialog deleted'
                });
            } else {
                res.status(404).json({
                    message: 'Dialog not found'
                });
            }
        } catch (error) {
            console.error('Error deleting dialog:', error);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    };

    
}

module.exports = DialogController;