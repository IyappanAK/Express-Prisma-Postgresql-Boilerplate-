const httpStatus = require('http-status');
const { boolean } = require('joi');
const { log } = require('winston');
const prisma = require('../prisma');
const { use } = require('../routes/v1/auth.route');
const ApiError = require('../utils/ApiError');
const commonUtils = require('../utils/commonUtils');

const createUser = async (userBody) => {
  const user = await prisma.User.create({ data: userBody });
  return user;
};

const getusers = async (phoneNumber) => {
  const user = await prisma.user.findMany({ include: { team: true } });
  return user;
};

const getUserByPhoneNumber = async (phoneNumber) => {
  const user = await prisma.user.findFirst({
    where: {
      phone_number: phoneNumber,
    },
    include: { team: true },
  });
  return user ? user : false;
};

const deleteUser = async (phoneNumber) => {
  const user = await getUserByPhoneNumber(phoneNumber);
  const responce = await prisma.user.delete({ where: { id: user.id } });
  return responce ? 'delete' : 'cant';
};

const getUserById = async (userid, addAdditionalInfo) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userid,
    },
    include: {
      team: true,
      Egg_Collection: addAdditionalInfo,
    },
  });
  return user;
};
const getUserBytoken = async (id) => {
  const user = await prisma.user.findFirst({ where: { id: id }, include: { role: true, team: true } });
  if (user) {
    delete user.password;
  }
  return user;
};

const updateUserById = async ({ id, name, email, phone_number, status }) => {
  const response = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      email: email,
      phone_number: phone_number,
      status: status,
    },
  });
  return response;
};

const updateUserByToken = async (userId, password) => {
  const res = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: password,
    },
  });
  return res;
};

const locationListByUserId = async (id, inputReq) => {
  const inputJson = {
    ...inputReq,
    pageNumber: parseInt(inputReq.pageNumber),
    pageSize: parseInt(inputReq.pageSize),
    pageOffset: parseInt((inputReq.pageNumber - 1) * inputReq.pageSize),
  };

  let query = `Select EG."id" as eggcollectionid, L."locationName", EG."latitude" as latitude, EG."longitude" as longitude,
              EG."created_at", EG."wastage_egg" as wasteegg, EG."no_of_eggs" as noOfEgg, 
              A."option" aproxTime, H."hatchery_name" as hatcheryName, EG."pit_number" as PitNumber, EG."hatchery_date" as incubation
              from "User" U
              LEFT OUTER JOIN "Egg_Collection" EG ON EG."userId" = U."id"
              LEFT OUTER JOIN "Location" L ON L."id" = EG."locationId"
              LEFT OUTER JOIN "Approx_Next_Time" A ON A."id" = EG."approx_next_timeId"
              LEFT OUTER JOIN "Hatchery" H ON H."id" = EG."hatchery_id"
                where U."id" = ${id}`;

  let countQuery = `Select COUNT(DISTINCT EG."id") totalcount
  from "User" U
    LEFT OUTER JOIN "Egg_Collection" EG ON EG."userId" = U."id"
    LEFT OUTER JOIN "Location" L ON L."id" = EG."locationId"
  where U."id" =${id}`;

  if (inputJson.searchString) {
    query += ` AND L."locationName"  LIKE '%${inputJson.searchString}%'`;
    countQuery += ` AND L."locationName"  LIKE '%${inputJson.searchString}%'`;
  }

  query += `ORDER BY EG."id" desc LIMIT ${inputJson.pageSize} OFFSET ${inputJson.pageOffset}`;

  let result = await prisma.$queryRawUnsafe(query);
  let resultCount = await prisma.$queryRawUnsafe(countQuery);

  if (result && result.length > 0) {
    result = commonUtils.constructData(result);
    resultCount = commonUtils.constructData(resultCount);

    return {
      count: resultCount[0].totalcount ? resultCount[0].totalcount : 0,
      rows: result,
      pageCount: Math.ceil(resultCount[0].totalcount / inputJson.pageSize),
      pageNumber: inputJson.pageNumber,
      pageSize: inputJson.pageSize,
    };
  }
  return [];
};

const getuserByEmail = async (email) => {
  const res = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  return res ? res : false;
};

// Super Admin  API For CreateWebUser

const createWebUsers = async (data) => {
  if (data.roleId !== 1) {
    data.password = commonUtils.encrypt('User@' + (1000 + Math.floor(Math.random() * 9000)));
  }
  if (data.roleId != 1 && data.teamId) {
    throw new ApiError(httpStatus[400], 'invalid Role Id');
  }
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (user) {
    throw new ApiError(httpStatus[400], 'email already exists');
  }
  return await prisma.User.create({ data });
};

const editWebUsersById = async (body, id) => {
  const user = await prisma.User.update({
    where: { id },
    data: {
      name: body.name,
      phone_number: body.phone_number,
      email: body.email,
      adminUserStatus: body.adminUserStatus,
      teamId: body.teamId,
      roleId: body.roleId,
    },
  });
  return user;
};

const getWebUsers = async (data) => {
  const { pageNumber, pageSize, searchName } = data;
  const search = searchName === '' ? undefined : searchName;
  const Skip = (Number(pageNumber) - 1) * Number(pageSize);
  const user = await prisma.User.findMany({
    skip: Skip,
    take: Number(pageSize),
    where: { name: { contains: search, mode: 'insensitive' } },
    include: {
      role: {
        select: {
          role_name: true,
        },
      },
      team: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { id: 'desc' },
  });
  const mapped = user.map((obj) => {
    return {
      ...obj,
      role_name: obj.role.role_name,
      team_name: obj.team == null ? '' : obj.team.name,
    };
  });
  const filtered = mapped.map(({ teamId, password, roleId, role, team, ...rest }) => rest);
  const searchCount = (await prisma.User.findMany({ where: { name: { contains: searchName, mode: 'insensitive' } } }))
    .length;
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

const getWebUserById = async (userid) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userid,
    },
    include: {
      team: true,
      role: true,
    },
  });

  if (user) {
    delete user.password;
  }
  return user;
};

module.exports = {
  getUserByPhoneNumber,
  createUser,
  getusers,
  getUserById,
  updateUserById,
  deleteUser,
  getuserByEmail,
  locationListByUserId,
  updateUserByToken,
  createWebUsers,
  editWebUsersById,
  getWebUsers,
  updateUserByToken,
  getUserBytoken,
  getWebUserById,
};
