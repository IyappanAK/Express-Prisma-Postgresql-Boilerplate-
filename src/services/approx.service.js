const httpStatus = require('http-status');
const { use } = require('passport');
const prisma = require('../prisma');
const ApiError = require('../utils/ApiError');
const commonUtils = require('../utils/commonUtils');


const approxList = async () => {
    const list = await prisma.approx_Next_Time.findMany()
    return list ? list : false;
  }

module.exports = {
    approxList
  }