const httpStatus = require('http-status');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {collectionService, userService, locationService} = require('../services');


const locationList = catchAsync( async (req, res) => {
    const list = await locationService.locationList()
    res.send(list)
})

const creatLocation = catchAsync( async (req, res) => {
    const list = await locationService.creationList( req.body)
    res.send(list)
})

const aproxLocationList = catchAsync( async (req, res) => {
    const list = await locationService.aproxList()
    res.send(list)
}) 


const hatcheryList = catchAsync( async (req, res) => {
    const list = await locationService.hatcheryListing()
    res.send(list)
}) 


module.exports = {
    locationList,
    creatLocation,
    aproxLocationList,
    hatcheryList
}