const express = require('express');
const authController = require('../controllers/authController');
const signupValidation = require('../middlewares/signupValidation');
const router = express.Router();

router.post('/signup', signupValidation, authController.signup);
router.post('/login',authController.login)

module.exports = router;
