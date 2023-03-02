const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { teamService, userService } = require('../services');
const { json } = require('express');
const axios = require('axios');


const updateUserByTeam =catchAsync( async (req, res) => {
     const userId = req.user.id;
    const { name, teamName, teamId } = req.body;


    let teamResponse = false;
    let response = false;

    if (teamId) {
      teamResponse = await teamService.getTeamInfoById(teamId)
    }

    if (teamName) {
      let teamReq = {
        name: teamName
      }
      teamResponse = await teamService.createTeam(teamReq)
      if (teamName && teamResponse.id) {
        let updateReq = {
          name,
          teamId: teamResponse.id,
          status : 'completed'
        }
        response =  await userService.updateUserById(userId, updateReq)
        
      }
    }

    if (teamResponse && teamId) {
      let updateReq = {
        name,
        teamId: teamResponse.id,
        status : 'completed'
      }
      response =  await userService.updateUserById(userId, updateReq)
    }

    res.send(response)
  });
    
 
  const teamList = catchAsync(async (req, res) => {
    const teamListData = await teamService.teamListData()
    res.send(teamListData);
  })

  const createTeam = catchAsync(async ( req, res ) => {
    const teamdata = await teamService.createTeam(req.body)
    res.send(teamdata)
  })

  const teamListForWeb = catchAsync(async ( req, res ) => {
    const inputReq = req.query;
    const teamlist = await teamService.teamListWithAllDetails(inputReq);
    res.json(teamlist)
  })

  const searchList = catchAsync(async ( req, res ) => {
    const { search }  = req.params;
    const serachList = await teamService.searchDetails(search);
    res.json(serachList)
  })

  const searchListForUser =  catchAsync(async ( req, res ) => {
    const { search }  = req.params;

    const serachList = await teamService.searchDetailsForUser(search);
    res.json(serachList)
  }) 

  const getTeambyId = catchAsync(async (req, res) => {

    const inputReq = req.query;
    const teamDetails = await teamService.getTeamInfoById(inputReq.teamId)
    const teamListData = await teamService.getTeambyId(inputReq);
    // console.log('teamListData', teamListData);
    res.json({
      teamDetails: teamDetails,
      teamUserList: teamListData
    });
  });

 

  module.exports = {
    updateUserByTeam,
    teamList,
    createTeam,
    teamListForWeb,
    getTeambyId,
    searchList,
    searchListForUser
  }