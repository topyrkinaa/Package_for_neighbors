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
            const authorID = req.params.id;
            const dialogs = await db.query('SELECT * FROM dialogs WHERE authorId = $1', [authorID]);
    
            if (dialogs.length === 0) {
                return res.status(404).json({
                    message: 'Dialogs not found',
                });
            }
    
            // Преобразуем результат в массив, если он не является массивом
            const dialogsArray = Array.isArray(dialogs) ? dialogs : [dialogs];
    
            // Для каждого диалога получаем полные данные о пользователях
            const dialogsWithUsers = await Promise.all(dialogsArray.map(async (dialog) => {
                const author = await db.query('SELECT * FROM users WHERE id = $1', [dialog.authorId]);
                const partner = await db.query('SELECT * FROM users WHERE id = $1', [dialog.partnerId]);
                return { ...dialog, author, partner };
            }));
    
            return res.json(dialogsWithUsers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }

 

    create = async (req, res) =>{
        try {
            const { authorid, partnerid, title  } = req.body;
    
            // Проверяем, существует ли уже диалог между автором и партнером
            const existingDialog = await db.query(
                `SELECT EXISTS (SELECT 1 FROM dialogs WHERE (authorId = '${authorid}' AND partnerId = '${partnerid}') OR (authorId = '${partnerid}' AND partnerId = '${authorid}')) AS it_does_exist; `)
            ;
    
            if (existingDialog.rows[0].it_does_exist) {
                return res.status(400).json({ message: `Dialog already exists` })
            } 
    
            // Вставляем новый диалог в таблицу dialogs
            const newDialog = await db.query(
                `INSERT INTO dialogs(authorId, partnerId) VALUES ('${authorid}', '${partnerid}') RETURNING *`
            );
                
            // Вставляем новое сообщение в таблицу messages для установки lastMessage
            const newMessage = await db.query(
            'INSERT INTO messages (title, dialogid, authorid, unread, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, newDialog.rows[0].id, authorid, false, new Date()]
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