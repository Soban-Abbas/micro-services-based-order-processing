const { prisma } = require('../src/config/dbpool')
const { secretDetails } = require('../src/config/config');
const { encryptPassword }=require('../src/util/encryptPassword')
const { AppError } = require("../src/errorHelpers/appError")
async function createSuperAdmin() {
    try {
        const superAdmin = await prisma.user.findFirst({ where: { email: secretDetails.adminEmail } })
        if (superAdmin) {
            throw new Error("super admin already exist")
    
        }

        const password = secretDetails.adminPassword;
const encryptedPassword=await encryptPassword(password)
        
        const createsuperadmin=await prisma.user.create({data:{email:secretDetails.adminEmail,password:encryptedPassword,role:'superadmin',updatedAt:new Date()}});
        

        console.log(createsuperadmin)



    } catch (error) {
        console.log(error);

    }finally{
        await prisma.$disconnect();
    }
}
createSuperAdmin();