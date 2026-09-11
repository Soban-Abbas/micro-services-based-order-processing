const bcrypt= require("bcrypt");
const AppError=require("../errorHelpers/appError")
exports.encryptPassword=async(password)=>{
   const salt =10;
   const encryptedPassword=await bcrypt.hash(password,salt);

   return encryptedPassword
}

exports.comparePassword=async(password,encryptedPassword)=>{
    try {
        const match=await bcrypt.compare(password,encryptedPassword);
        return match
    } catch (error) {
        throw new AppError(500,'password comparison failed')
    }
}
