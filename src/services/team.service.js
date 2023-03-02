const { not } = require('joi');
const { team, user } = require('../prisma');
const prisma = require('../prisma');
const commonUtils = require('../utils/commonUtils');

const createTeam = async (data) => {
  return await prisma.team.create({ data: data });
};

const getTeamInfoById = async (teamId) => {
  const teamdetails = await prisma.team.findFirst({
    where: { id: teamId },
  });
  return teamdetails ? teamdetails : false;
};

const teamListData = async () => {
  const teamdetails = await prisma.team.findMany();
  return teamdetails;
};

const teamListWithAllDetails = async (inputReq) => {
  const inputJson = {
    ...inputReq,
    pageNumber: parseInt(inputReq.pageNumber),
    pageSize: parseInt(inputReq.pageSize),
    pageOffset: parseInt((inputReq.pageNumber - 1) * inputReq.pageSize),
    searchString: inputReq.searchString ? inputReq?.searchString?.toLowerCase() : null,
  };

  let query = `SELECT T."id",T."name" as teamame, COUNT( DISTINCT U."id") as userCount,
     SUM(E."no_of_eggs") as teamTotalEgg , SUM(E."wastage_egg") as wastageEgg
     FROM "Team" T
     LEFT OUTER JOIN "User" U ON U."teamId"=T."id" 
     LEFT OUTER  JOIN "Egg_Collection" E ON U."id" = E."userId"
     WHERE 1=1 AND T."id" IS NOT NULL AND U."roleId" <> 2`;

  let countQuery = `SELECT COUNT(DISTINCT T."id") totalCount
     FROM "Team" T
     LEFT OUTER JOIN "User" U ON U."teamId"=T."id" 
     LEFT OUTER JOIN "Egg_Collection" E ON U."id" = E."userId"
     WHERE 1=1 AND T."id" IS NOT NULL AND U."roleId" <> 2 `;

  if (inputJson.searchString) {
    query += `AND lower(T."name") LIKE '%${inputJson.searchString}%'`;

    countQuery += `AND  lower(T."name") LIKE '%${inputJson.searchString}%' `;
  }

  query += ` GROUP BY T."id" ORDER BY T."id" desc LIMIT ${inputJson.pageSize} OFFSET ${inputJson.pageOffset}`;

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

const searchDetails = async (searchData) => {
  console.log(searchData);
  const result = await prisma.team.findMany({
    where: {
      name: {
        startsWith: searchData,
      },
    },
  });
  return result;
};

const searchDetailsForUser = async (searchData) => {
  console.log(searchData);
  const result = await getTeambyId();
  return result;
};

const getTeambyId = async (inputReq) => {
  const inputJson = {
    ...inputReq,
    pageNumber: parseInt(inputReq.pageNumber),
    pageSize: parseInt(inputReq.pageSize),
    pageOffset: parseInt((inputReq.pageNumber - 1) * inputReq.pageSize),
    searchString: inputReq.searchString ? inputReq?.searchString?.toLowerCase() : null,
  };

  let query = `SELECT DISTINCT U."id" as idUser, U."name" as name, SUM(EG.no_of_eggs) totalEggCount, SUM(EG."wastage_egg") as wasteegg, MAX(EG."created_at") as lastlocation
  FROM "User" U 
    LEFT OUTER JOIN "Egg_Collection" EG on EG."userId" = U."id"
	  LEFT OUTER JOIN "Team" T on U."teamId"=T."id" 
    WHERE T."id" = ${inputJson.teamId} AND U."roleId" = 1 `;

  let countQuery = `SELECT COUNT(DISTINCT U."id") totalCount
  FROM "User" U 
    LEFT OUTER JOIN "Egg_Collection" EG on EG."userId" = U."id"
	  LEFT OUTER JOIN "Team" T on U."teamId"=T."id" 
    WHERE T."id" = ${inputJson.teamId} AND U."roleId" = 1 `;

  if (inputJson.searchString) {
    query += ` AND lower(U."name") LIKE '%${inputJson.searchString}%'`;
    countQuery += ` AND lower(U."name") LIKE '%${inputJson.searchString}%'`;
  }

  query += `GROUP BY U."id" ORDER BY  U."id" desc LIMIT ${inputJson.pageSize} OFFSET ${inputJson.pageOffset}`;

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

module.exports = {
  createTeam,
  getTeamInfoById,
  teamListData,
  teamListWithAllDetails,
  getTeambyId,
  searchDetails,
  searchDetailsForUser,
};
