const db = require('../db')
const bcrypt = require('bcryptjs')

class UserController {
    async createUser(req, res) {
      try {
        const { email, username, surname, patronymic, password } = req.body
        const candidate = await db.query(`SELECT EXISTS (SELECT 1 FROM users WHERE email = '${email}') AS it_does_exist; `)
        if (candidate.rows[0].it_does_exist) {
          return res.status(400).json({ message: `User with email ${email} already exist` })
        } 
        
        const hashPassword = await bcrypt.hash(password, 15)
        const newPerson = await db.query(`INSERT INTO users(email, username, surname, patronymic, password) values ($1, $2, $3, $4, $5) RETURNING *`, [email, username, surname, patronymic, hashPassword]) 
        res.json(newPerson.rows[0])
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error', error: error.message })

      }
    }
  }
  
  module.exports = new UserController();
  