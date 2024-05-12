const Router = require('express');
const router = new Router();
const UploadController = require('../controller/upload.controller');
const upload = require('../core/uploader');

const fileMiddleware = require('../middleware/file.middleware')

const uploadRouter = (io) => {
    const UploadCtr = new UploadController(io);

    router.post("/files", upload.single("file"), UploadCtr.create);
    router.delete("/files", UploadCtr.delete);

    return router;
}


module.exports = uploadRouter;