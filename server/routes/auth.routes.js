const Router = require('express')
const router = new Router()

router.post('/register', (req,res) => {
    try {
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.post('/dialogs', (req,res) => {
    try { 
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.post('/messages', (req,res) => {
    try {   
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.post('/files', uploader.single('image'), (req,res) => {
    try {   
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})
