const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router()

router.route('/signin')
  .post(authController.signin);

router.route('/signout')
  .get(authController.signout);

  module.exports = router;


