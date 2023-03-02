const express = require('express');
// const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const collectioncontroller = require('../../controllers/collection.controller');
const collectionvalidation = require('../../validations/collection.validation');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/').post(validate(userValidation.createUser), userController.createUser).get(userController.getUsers);

router
  .route('/teamorganization')
  .get(auth(), validate(userValidation.locationvalidateByUser), userController.locationByuser);

// Super Admin Web  API Routes
router.route('/create-user').post(validate(userValidation.createWebUser), userController.createWebUsers);
router.route('/edit-user/:id').put(validate(userValidation.updateWebUser), userController.editWebUsers);
router.route('/list-user').get(auth(), validate(userValidation.listWebUser), userController.getWebUsers);
router.route('/get-user/:id').get(auth(), validate(userValidation.listWebUserById), userController.getWebUserById);

router.route('/token').get(auth(), userController.getUserBytoken);

router.route('/:id').get(userController.getUserById);

// Important: get user by id needs to be at the end
router.route('/:id').get(userController.getUserById);

module.exports = router;
