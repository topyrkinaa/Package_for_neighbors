const verifyJWToken = require('../utils/verifyJWToken')

function updateLastSeen(req, __, next) {

    verifyJWToken(token)
        .then(user => {
        req.user.data = email;
        db.query(`UPDATE users SET last_seen = $1 WHERE email = $2`, [new Date(), email]);
        next();
    }).catch(err => {
        console.log(err);
        res.status(403).json({message: "Время бежит"})
    });

}

module.exports = updateLastSeen;