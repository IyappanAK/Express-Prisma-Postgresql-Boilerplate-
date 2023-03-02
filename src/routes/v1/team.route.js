
const express = require('express');
const teamValidation = require('../../validations/team.validation')
const teamController = require('../../controllers/team.controller')
const validate = require ('../../middlewares/validate');
const collectioncontroller = require('../../controllers/collection.controller')
const router = express.Router();
const auth = require('../../middlewares/auth');
const { Router } = require('express');
const { route } = require('./auth.route');


router 
  .route('/teamprofile')
  .get(auth(),teamController.teamList)
  .post(auth(), validate(teamValidation.updateUserByTeam),teamController.updateUserByTeam)

  
router.route('/teamorganization')
  .get(auth(), validate(teamValidation.teamlistwebvalidate), teamController.teamListForWeb)
  

  
router.route('/teamorganization/userList')
  .get(auth(), validate(teamValidation.teamUserList), teamController.getTeambyId);







  
module.exports = router