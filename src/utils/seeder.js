const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const houses = require('./../data/houseads.json')
const users = require('./../data/users.json')

const seedHouses = async () => {
    try{

        await prisma.HouseAd.deleteMany();
        console.log('Ads deleted.');
        // await prisma.User.deleteMany();
        // console.log('Users deleted.');

        await prisma.HouseAd.createMany({ data: houses })
        console.log("All Ads added.")
        // await prisma.User.createMany({ data: users })
        // console.log("All Users added.")

        process.exit();

    } catch(error){
        console.log(error);
        process.exit();
    }
}

seedHouses();