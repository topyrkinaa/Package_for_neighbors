const multer = require('multer')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'images/')
    },
    filename(req, file, cb) {
        cb(null, (new Date()).toISOString + '-' + file.originalname)
    },

})

const types = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/bmp']

const filefilter = (req, file, cb) => {
    if (types.includes(file.mimetypes)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({storage, filefilter});