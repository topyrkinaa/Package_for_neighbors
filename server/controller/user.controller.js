const db = require('../db')
const bcrypt = require('bcryptjs')
const createJWToken = require('../utils/createJWToken')

class UserController {
  io;

  constructor(io) {
    this.io = io;
  }

    createUser = async (req, res) => {
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
        const status = "success"
        return res.json({ status });
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error', error: error.message })

      }
    }

    getUsers = async (req,res) => {
      try {
      const users = await db.query(`SELECT * FROM users`)
      res.json(users.rows)
      }catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error', error: error.message })
      }
    }

    getOneUser = async (req,res)=> {
      try {
        const id = req.params.id
        const users = await db.query(`SELECT * FROM users WHERE id = '${id}' `)
        res.json(users.rows[0])
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error', error: error.message })
      }
    }

    findUser = async(req,res) => {
      try {
        const qwery = req.query.qwery
        console.log(qwery);
        const users = await db.query('SELECT * FROM users WHERE email LIKE $1 OR username LIKE $1', [`%${qwery}%`]);
        res.json(users.rows)
      } catch (error) {
        console.error(error)
        res.status(404).json({ status: 'error', message: 'Internal Server Error', error: error.message })
      }
    }
    
    getme = async(req,res) => {
      try {
        const email = req.user.data
        const users = await db.query(`SELECT * FROM users WHERE email = '${email}' `)
        res.json( users.rows[0])
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error', error: error.message })
      }
    }



    updateUser = async (req,res) => {
      try {
        const email = req.user.data // получаем email по токену
        const user = await db.query(`SELECT * FROM users WHERE email = '${email}' `)
        let { telephone, roommates, avatar } = req.body

        if (telephone == null) {
          telephone = user.rows[0].telephone
        } 
        if (roommates == null) {
          roommates = user.rows[0].roommates
        } 
        if (avatar == null) {
          avatar = user.rows[0].avatar
        }

        const users = await db.query(`UPDATE users set telephone = '${telephone}', roommates = '${roommates}', avatar = '${avatar}' where id = '${user.rows[0].id}' RETURNING * `)
        res.json(users.rows[0])
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error', error: error.message })
      }
    }

    deleteUser = async (req,res) => {
      try {
        const id = req.params.id
        const user = await db.query(`DELETE FROM users where id = '${id}' `)
        res.json(user.rows[0])
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error', error: error.message })
      }
    }

    loginUser = async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (user.rows.length === 0) {
          return res.json({ status: "error" });
        }
    
        const isPassValid = bcrypt.compareSync(password, user.rows[0].password);
        if (!isPassValid) {
          return res.json({ status: "error" });
        }
    
        db.query(`UPDATE users SET last_seen = $1 WHERE email = $2`, [new Date(), email]);
        const status = "success"
        const token = createJWToken(email);

        return res.json({
          token, status, user: user.rows[0]
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
      }
    }
  }
  
  module.exports = UserController;
  