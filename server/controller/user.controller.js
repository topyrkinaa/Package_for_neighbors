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

    async getUsers(req,res) {
      try {
      const users = await db.query(`SELECT * FROM users`)
      res.json(users.rows)
      }catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error', error: error.message })
      }
    }

    async getOneUser(req,res) {
      try {
        const id = req.params.id
        const users = await db.query(`SELECT * FROM users WHERE id = '${id}' `)
        res.json(users.rows[0])
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error', error: error.message })
      }
    }

    async updateUser(req,res) {
      try {
        const { id, email, username, surname, patronymic, password } = req.body
        const users = await db.query(`UPDATE users set email = '${email}', username = '${username}', surname = '${surname}', patronymic = '${patronymic}', password = '${password}' where id = '${id}' RETURNING * `)
        res.json(users.rows[0])
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error', error: error.message })
      }
    }

    async deleteUser (req,res) {
      try {
        const id = req.params.id
        const user = await db.query(`DELETE FROM users where id = '${id}' `)
        res.json(user.rows[0])
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error', error: error.message })
      }
    }
    
  }
  
  module.exports = new UserController();
  