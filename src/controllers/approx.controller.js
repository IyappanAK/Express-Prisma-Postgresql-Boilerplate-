const httpStatus = require('http-status');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { approxService} = require('../services');


const getApproxList = catchAsync( async ( req, res) => {
    const responceList = await approxService.approxList()
    res.send( responceList )
  })
  

  
  module.exports = {
    getApproxList
  }