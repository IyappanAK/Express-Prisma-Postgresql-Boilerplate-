const prisma = require('../prisma');
const { constructDataforlist } = require('../utils/commonUtils')

const locationList = async() => {
    const responce = await prisma.location.findMany({
        orderBy : {
            id : 'asc'
        }
    })
    return responce
}

const creationList = async(location) => {
    const responce = await prisma.location.create({data : {...location}})
    return responce
}

const aproxList = async () => {
    const responce = await prisma.approx_Next_Time.findMany({
        orderBy : {
            id : 'asc'
        }
    })   
    return responce 
}

const hatcheryListing = async () => {
    const responce = await prisma.hatchery.findMany() 
    return responce     
}

module.exports = {
    locationList,
    creationList,
    aproxList,
    hatcheryListing
}