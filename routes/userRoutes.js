const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// POST /signup
router.post('/signup', UserController.signup);

router.post('/login', UserController.login);

router.get('/forgetPass', UserController.forgetPass);
router.post('/resetPass', UserController.resetPassword);
router.post('/changePassword', UserController.changePassword);


module.exports = router;



 

//module.exports=router;