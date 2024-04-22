const jwt = require('jsonwebtoken')
module.exports = (payload) => {
    const token = jwt.sign(payload,
        process.env.jwt_secret_key)
    return token
}