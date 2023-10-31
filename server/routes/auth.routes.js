const Router = require('express')
const router = new Router()

router.post('/register', (req,res) => {
    try {

        
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})
