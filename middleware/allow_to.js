
module.exports = (...roles) => {
    return (req, res, next) => {
      console.log(roles)
        if (!roles.includes(req.currentUser.role)) {
          return res.status(401).json('this role is not authorized')
        }
        next()
    }
}