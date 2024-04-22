
module.exports = (...rols) => {
    return (req, res, next) => {
        if (!rols.includes(req.currentUser.role)) {
          return res.status(401).json('this role is not authorized')
        }
        next()
    }
}