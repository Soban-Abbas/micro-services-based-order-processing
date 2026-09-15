const { prisma } = require("../config/dbpool");
const AppError = require("../errorHelpers/appError")
exports.findByEmail = async (email) => {
    const user = await prisma.user.findUnique({ where: { email: email }  });

    return user
}
exports.registerNewUser=async(email,password , role)=>{
    const newUser=await prisma.user.create({
        data:{email:email,password:password,role:role,createdAt:new Date(),updatedAt:new Date}, 
        
})

    return newUser;
}