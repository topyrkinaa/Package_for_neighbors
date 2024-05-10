const Router = require('express');
const router = new Router();
const UploadController = require('../controller/upload.controller');
const uploader = require('../core/uploader');

const fileMiddleware = require('../middleware/file.middleware')

const uploadRouter = (io) => {
    const UploadCtr = new UploadController(io);

    router.post("/files", fileMiddleware.single("image"), UploadCtr.create);
    router.delete("/files", UploadCtr.delete);

    return router;
}


module.exports = uploadRouter;