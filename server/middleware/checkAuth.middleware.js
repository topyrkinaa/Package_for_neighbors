const verifyJWToken = require('../utils/verifyJWToken')

function checkAuth(req, res, next) {
    const token = req.headers.token;

    if (req.path === '/api/auth/login' || req.path === '/api/auth/register' || req.path === '/api/files') {
        return next();
    }

    verifyJWToken(token)
        .then(user => {
        req.user = user;
        next();
    }).catch(err => {
        console.log(err);
        res.status(403).json({message: "Invalid auth token provided."})
    });
}

module.exports = checkAuth;

