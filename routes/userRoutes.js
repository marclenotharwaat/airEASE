const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// POST /signup
router.post('/signup', UserController.signup);

router.post('/login', UserController.login);

router.get('/forgetPass', UserController.forgetPass)
module.exports = router;



 

//module.exports=router;