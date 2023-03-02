const express = require('express');
const validate = require ('../../middlewares/validate');
const approxController = require('../../controllers/approx.controller')
const router = express.Router();


router 
  .route('/')
  .get(approxController.getApproxList)

module.exports = router