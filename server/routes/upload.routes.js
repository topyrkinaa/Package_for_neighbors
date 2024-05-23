const Router = require('express');
const router = new Router();
const UploadController = require('../controller/upload.controller');
const uploader = require('../core/uploader');

const uploadRouter = () => {

    const UploadCtr = new UploadController();

    router.post("/files", uploader.single("file"), UploadCtr.create);
    router.delete("/files", UploadCtr.delete);

    return router;
}


module.exports = uploadRouter;