const httpStatus = require('http-status');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { collectionService, userService } = require('../services');
const { response } = require('express');
const { user } = require('../prisma');
const moment = require('moment');

const collectionList = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const collectionListData = await collectionService.collectionListData(userId);
  res.send(collectionListData);
});
const updateCollectionList = catchAsync(async (req, res) => {
  const data = req.body;
  const collectionListData = await collectionService.updateCollectionList(data);
  res.send(collectionListData);
});
const webCollectionList = catchAsync(async (req, res) => {
  const collectionListData = await collectionService.webCollectionList();
  res.send(collectionListData);
});

// const deletecollection = catchAsync(async (req, res) => {
//   await userService.deleteUserById(req.params.collectionid);
//   res.status(httpStatus.NO_CONTENT).send();
// });

const collectionListByid = catchAsync(async (req, res) => {
  const { id } = req.params;
  const collectionListData = await collectionService.getCollectionById(Number(id));
  res.send(collectionListData);
});
const webGetCollectionById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const collectionListData = await collectionService.webGetCollectionById(Number(id));
  res.send(collectionListData);
});

const createCollection = catchAsync(async (req, res) => {
  const userdetails = await userService.getUserById(req.user.id, false);
  const reqbody = req.body;
  const collectionReq = {
    locationId: reqbody.locationId,
    latitude: reqbody.latitude,
    longitude: reqbody.longitude,
    nest_width: reqbody.width,
    nest_depth: reqbody.depth,
    no_of_eggs: reqbody.noOfEgg,
    wastage_egg: reqbody.wastageEgg,
    approx_next_timeId: reqbody.approxNextTimeId,
    distance_of_sea: reqbody.distanceOfEgg,
    temperature: reqbody.temperature,
    userId: userdetails.id,
    status: reqbody.status,
    height: reqbody.height,
    nest_there: reqbody.nestThere,
  };

  const response = {
    eggData: '',
    imgData: 'not update',
    message: 'error',
  };

  response.eggData = await collectionService.createCollection(collectionReq);

  if (reqbody.imgUrls && reqbody.imgUrls.length > 0) {
    const data = await reqbody.imgUrls.map((item) => ({
      imageUrl: item,
      eggCollectionId: response.eggData.id,
    }));
    response.imgData = await collectionService.createImg(data);
  }

  response.message = response.eggData.message ? 'error' : 'success';

  res.send(response);

  // if (reqbody.id && !reqbody.imageUrls) {
  //   response.eggData = await collectionService.updateCollection({...collectionReq})
  //   response.message = response.eggData.message ? "error" : "success"
});
const webCreateCollection = catchAsync(async (req, res) => {
  const data = req.body;
  const response = await collectionService.webCreateCollection(data);

  res.send(response);
});

const webCreatedData = catchAsync(async (req, res) => {
  const response = await collectionService.webCreatedData(req.query);

  res.send(response);
});
const hatcheryupdate = catchAsync(async (req, res) => {
  const reqbody = req.body;
  const collectionReq = {
    id: reqbody.id,
    hatchery_id: reqbody.hatcheryId,
    incharge_name: reqbody.inchargeName,
    pit_number: reqbody.pitNumber,
    hatchery_date: moment.utc().format(),
  };
  const response = await collectionService.updateCollection(collectionReq);
  res.send(response);
});

// // if (reqbody.imgUrls || req.id && (reqbody.imageUrl && req.id) ) {
// //     const data = {
// //     imageUrl: reqbody.imgUrls,
// //     eggCollectionId: reqbody.id}
// //   await collectionService.createImg(data);
// //   response.eggData = await collectionService.updateCollection(collectionReq)
// // }
//  if (req.imageUrl && !req.id ){
//   const eggData = await collectionService.createCollection({ ...collectionReq });
//   const getIdCollection = await collectionService.getIdByCollection(eggData)
//   console.log(getIdCollection);
//   response.eggData = await collectionService.createCollection({ ...collectionReq });
// }

const getCollectionSingle = catchAsync(async (req, res) => {
  const id = parseInt(req.params.id);
  const collectionDetails = await collectionService.getCollectionById(id);
  res.send(collectionDetails);
});

const getCollectionDetailsFromLocationId = catchAsync(async (req, res) => {
  const { eggCollectionId } = req.query;
  const collectionDetails = await collectionService.getDetailByEggCollectionId(eggCollectionId);
  res.send(collectionDetails);
});

module.exports = {
  createCollection,
  getCollectionSingle,
  hatcheryupdate,
  collectionList,
  collectionListByid,
  getCollectionDetailsFromLocationId,
  webCreateCollection,
  webCollectionList,
  updateCollectionList,
  webGetCollectionById,
  webCreatedData,
};
