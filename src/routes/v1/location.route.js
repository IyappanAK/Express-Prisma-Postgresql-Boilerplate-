const express = require('express');
const router = express.Router();
const locationController = require('../../controllers/location.controller');
const validate = require('../../middlewares/validate');
const locationValidation = require('../../validations/location.validation')


router 
  .route('/')
  .get(locationController.locationList)
  .post(validate(locationValidation.location), locationController.creatLocation) 

router.route('/aprox')
  .get(locationController.aproxLocationList)

router.route('/hatchery')
  .get(locationController.hatcheryList)



module.exports = router