const httpStatus = require('http-status');
const { use } = require('passport');
const prisma = require('../prisma');
const ApiError = require('../utils/ApiError');
const commonUtils = require('../utils/commonUtils');
const moment = require('moment');
const dayjs = require('dayjs');
const { date } = require('joi');
const { user } = require('../prisma');

const collectionListData = async (userId) => {
  let startDate = '';
  let endDate = '';

  if (moment().utcOffset('+05:30').hour() >= 20) {
    startDate = moment().utcOffset('+05:30').endOf('day').subtract(4, 'hours').utc().format();
    endDate = moment()
      .utcOffset('+05:30')
      .add(1, 'days')
      .endOf('day')
      .subtract(4, 'hours')
      .add(59, 'minutes')
      .add(59, 'seconds')
      .utc()
      .format();
  } else {
    startDate = moment().utcOffset('+05:30').startOf('day').subtract(4, 'hours').utc().format();
    endDate = moment()
      .utcOffset('+05:30')
      .endOf('day')
      .subtract(4, 'hours')
      .subtract(1, 'minutes')
      .add(1, 'seconds')
      .utc()
      .format();
  }

  // // new Date().getHours()
  // console.log("new Date().getHours() ", moment().utcOffset("+05:30").hour() );
  // console.log("startDate", startDate);
  // console.log("endDate", endDate);
  const collection = await prisma.egg_Collection.findMany({
    include: {
      location_name: true,
      Egg_Image: true,
      hatchery: true,
    },
    where: {
      userId: userId,
      created_at: {
        lte: endDate,
        gte: startDate,
      },
    },
    orderBy: {
      id: 'desc',
    },
  });
  return collection;
};

const getIdByCollection = async (collectionBody) => {
  return false;
};
const updateCollectionList = async (data) => {
  const updateList = await prisma.egg_Collection.update({
    where: { id: data.id },
    data: { ...data },
    include: { Egg_Image: true },
  });
  return updateList;
};
const webCollectionList = async () => {
  const list = await prisma.egg_Collection.findMany({});
  return list;
};
const webCreatedData = async (data) => {
  const { pageNumber, pageSize, searchName } = data;
  const Skip = (Number(pageNumber) - 1) * Number(pageSize);
  const allData = await prisma.egg_Collection.findMany({
    skip: Skip,
    take: Number(pageSize),
    where: { user: { name: { contains: searchName, mode: 'insensitive' } } },
    include: {
      user: { include: { team: true } },
      location_name: { select: { locationName: true } },
      hatchery: { select: { hatchery_name: true } },
      Egg_Image: { select: { imageUrl: true } },
    },
    orderBy: { id: 'desc' },
  });
  const mapped = await allData.map((obj) => {
    return {
      ...obj,
      volunteer_name: obj.user?.name,
      Phone_Number: obj.user.phone_number,
      team_name: obj.user?.team?.name,
      location_Name: obj.location_name.locationName,
      hatchery_name: obj.hatchery.hatchery_name,
    };
  });
  const filtered = mapped.map(({ user, location_name, hatchery, ...rest }) => rest);
  const searchCount = (
    await prisma.egg_Collection.findMany({ where: { user: { name: { contains: searchName, mode: 'insensitive' } } } })
  ).length;
  const totalCount = searchCount > 10 ? await prisma.egg_Collection.count() : searchCount;
  const totalPages = Math.ceil(totalCount / Number(pageSize));
  return {
    meta: {
      searchCount,
      total: totalCount,
      pageNumber: parseInt(pageNumber),
      pageSize: parseInt(pageSize),
      totalPages: totalPages,
    },
    data: filtered,
  };
};

const createCollection = async (collectionBody) => {
  const collectionDetails = await prisma.egg_Collection.create({
    data: { ...collectionBody },
    include: {
      location_name: true,
      approx_next_time: true,
    },
  });
  return collectionDetails;
};

const webCreateCollection = async (data) => {
  const image = data.imageUrl;
  delete data.imageUrl;
  console.log('------>$$$$$$$$$$$$$', data);
  const collectionDetails = await prisma.egg_Collection.create({
    data: { ...data, Egg_Image: { createMany: { data: image } } },
    include: {
      location_name: true,
      approx_next_time: true,
      Egg_Image: true,
    },
  });
  return collectionDetails;
};
const updateCollection = async (collectionBody) => {
  const details = await prisma.egg_Collection.update({
    where: {
      id: collectionBody.id,
    },
    data: {
      ...collectionBody,
    },
  });
  return details;
};

//updated
const getCollectionById = async (id) => {
  // const start = dayjs().startOf('date').toDate();
  // const end = dayjs().endOf('date').toDate();
  const collection = await prisma.egg_Collection.findMany({
    where: {
      userId: id,
      // created_at: { lte: end, gte: start },
    },
    include: { approx_next_time: true, Egg_Image: true, location_name: true },
  });

  return collection ? collection : false;
};
const webGetCollectionById = async (id) => {
  console.log(id, 'id');
  const collection = await prisma.egg_Collection.findFirst({ where: { id: id } });
  return collection ? collection : false;
};

const createImg = async (collectionBody) => {
  const imgUrls = await prisma.egg_Image.createMany({
    data: collectionBody,
  });
  return imgUrls ? imgUrls : false;
};

const UpdateImg = async (collectionBody) => {
  console.log('collectionBody', collectionBody);
  const responce = await prisma.egg_Image.update({
    where: { eggCollectionId: collectionBody.eggCollectionId },
    data: collectionBody,
  });
  return responce ? responce : false;
};

const getDetailByEggCollectionId = async (eggCollectionId) => {
  const responce = await prisma.egg_Collection.findFirst({
    where: {
      id: eggCollectionId,
    },
    include: {
      Egg_Image: true,
    },
  });

  return { details: responce ? responce : [] };
};

module.exports = {
  collectionListData,
  createCollection,
  getCollectionById,
  createImg,
  updateCollection,
  getIdByCollection,
  getDetailByEggCollectionId,
  webCollectionList,
  webCreateCollection,
  updateCollectionList,
  webGetCollectionById,
  webCreatedData,
};
