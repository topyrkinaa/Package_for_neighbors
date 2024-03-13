const db = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const createJWToken = require('../utils/createJWToken')

class UserController {
    async createUser(req, res) {
      try {
        const { email, username, surname, patronymic, password } = req.body
        const candidate = await db.query(`SELECT EXISTS (SELECT 1 FROM users WHERE email = '${email}') AS it_does_exist; `)
        if (candidate.rows[0].it_does_exist) {
          return res.status(400).json({ message: `User with email ${email} already exist` })
        } 
        const hashPassword = await bcrypt.hash(password, 8)
        const newPerson = await db.query(`INSERT INTO users(email, username, surname, patronymic, password, last_seen) values ($1, $2, $3, $4, $5, $6) RETURNING *`,
         [email, username, surname, patronymic, hashPassword,  new Date()]) 
        //res.json(newPerson.rows[0])
        res.json({message: "User was created"})
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

    async getme(req,res) {
      try {
        const email = req.user.data
        const users = await db.query(`SELECT * FROM users WHERE email = '${email}' `)
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

    async loginUser(req, res) {
      try {
        const { email, password } = req.body;
        const user = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (user.rows.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }
    
        const isPassValid = bcrypt.compareSync(password, user.rows[0].password);
        if (!isPassValid) {
          return res.status(400).json({ message: "Invalid password" });
        }
    
        const update = db.query(`UPDATE users SET last_seen = $1 WHERE email = $2`, [new Date(), email]);
        
        const token = createJWToken(email);

        return res.json({
          token,
          user: {
            id: user.rows[0].id,
            username: user.rows[0].username,
            surname: user.rows[0].surname,
            patronymic: user.rows[0].patronymic,
          },
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
      }
    }
  }
  
  module.exports = new UserController();
  