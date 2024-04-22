const JWT = require('jsonwebtoken')
const verifyToken = (req, res, next) => {

    const authHeader = req.headers['Authorization'] || req.headers["authorization"]
    if (!authHeader) {
        return res.status(404).json('token is required')
    }
    const token = authHeader.split(' ')[1];

    try {
        const currentUser = JWT.verify(token, process.env.jwt_secret_key)
        req.currentUser = currentUser;
        next();
    } catch (error) {
        return res.status(404).json('token is invalid ')

    }

}
module.exports = verifyToken;