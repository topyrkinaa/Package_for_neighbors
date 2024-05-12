const db = require('../db');

const cloudinary = require('../core/cloudinary');


class UploadController {
    constructor(io) {
        this.io = io;
    }
    io;
    
    async create(req, res) {
        try {  

            const file = req.file;
            
            cloudinary.v2.uploader.upload_stream({ resource_type : "auto"}, async (error, result) => {
                if (error) {
                    throw new Error(error)
                }
                
                const fileData = {
                    filename: result.original_filename,
                    size: result.bytes,
                    ext: result.format,
                    url: result.url,
                    created_at: new Date()
                };

                const newFile = await db.query(
                    'INSERT INTO uploadfile ( filename, size, ext, url, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                    [ fileData.filename, fileData.size, fileData.ext, fileData.url, fileData.created_at]
                );
                
                return res.json({
                    id: newFile.rows[0].id,
                    filename: newFile.rows[0].filename,
                    size: newFile.rows[0].size,
                    ext: newFile.rows[0].ext,
                    url:  newFile.rows[0].url,
                    created_at: newFile.rows[0].created_at,
                });
            }).end(file.buffer)
        
            /*
            const fileData = {
                filename: file.originalname,
                size: file.size,
                ext: file.mimetype,
                path: "https://i.pinimg.com/564x/37/a0/e8/37a0e8b8acda2dcabf3366e47767a8b2.jpg",
                created_at: new Date()
            };

            const newFile = await db.query(
                'INSERT INTO uploadfile ( filename, size, ext, url, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [ fileData.filename, fileData.size, fileData.ext, fileData.path, fileData.created_at]
            );


            console.log({
                id: newFile.rows[0].id,
                filename: newFile.rows[0].filename,
                size: newFile.rows[0].size,
                ext: newFile.rows[0].ext,
                url:  newFile.rows[0].url,
                created_at: newFile.rows[0].created_at,
            })

            return res.json({
                id: newFile.rows[0].id,
                filename: newFile.rows[0].filename,
                size: newFile.rows[0].size,
                ext: newFile.rows[0].ext,
                url:  newFile.rows[0].url,
                created_at: newFile.rows[0].created_at,
            });*/

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