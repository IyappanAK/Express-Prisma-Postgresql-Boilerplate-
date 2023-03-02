const express = require('express');
const validate = require('../../middlewares/validate');
const collectionController = require('../../controllers/collection.controller');
const collectionValidate = require('../../validations/collection.validation');
const router = express.Router();
const auth = require('../../middlewares/auth');

router
  .route('/')
  .post(auth(), validate(collectionValidate.creatNewList), collectionController.createCollection)
  .get(auth(), collectionController.collectionList)
  .patch(auth(), collectionController.updateCollectionList);

router
  .route('/web')
  .post(auth(), collectionController.webCreateCollection)
  .get(auth(), collectionController.webCollectionList);

router.route('/hatchery').post(auth(), validate(collectionValidate.updatelist), collectionController.hatcheryupdate);

router
  .route('/teamorganization')
  .get(
    auth(),
    validate(collectionValidate.teamorganizationLocationimg),
    collectionController.getCollectionDetailsFromLocationId
  );

  router
  .route('/web/created-data')
  .get(auth(), collectionController.webCreatedData)
  
router.route('/:id').get(auth(), collectionController.collectionListByid);
router.route('/web/:id').get(auth(), collectionController.webGetCollectionById);


module.exports = router;
