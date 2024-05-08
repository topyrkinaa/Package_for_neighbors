const db = require('../db');

class UploadController {

    
    async create(req, res) {
        try {   
            console.log('мы тут')
            const email = req.user.data // получаем email по токену
            const user = await db.query(`SELECT * FROM users WHERE email = '${email}' `)

            console.log(user);

            const file = req.file;
        

            const fileData = {
                filename: file.originalname,
                size: file.size,
                ext: file.mimetype,
                url: file.url,
                user: user.rows[0].id,
                created_at: new Date()
            };

            const newFile = await db.query(
                'INSERT INTO uploadfile (authorid, filename, size, ext, url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [fileData.user, fileData.filename, filename.size, fileData.ext, fileData.url]
            );

            res.json({
                id: newFile.rows[0].id,
                authorid: newFile.rows[0].authorid,
                filename: newFile.rows[0].filename,
                size: newFile.rows[0].size,
                ext: newFile.rows[0].ext,
                url:  newFile.rows[0].url
            });


            return res.json({
                id: newFile.rows[0].id,
                authorid: newFile.rows[0].authorid,
                filename: newFile.rows[0].filename,
                size: newFile.rows[0].size,
                ext: newFile.rows[0].ext,
                url:  newFile.rows[0].url
            });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
      }
    
    };

    async delete(req, res) {
        try {    
                return console.log(req.file);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
          }
    };
}

module.exports = UploadController;