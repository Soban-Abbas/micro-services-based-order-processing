const bcrypt= require("bcrypt");
const AppError=require("../errorHelpers/appError")
exports.encryptPassword=async(password)=>{
   const salt =10;
   const encryptedPassword=await bcrypt.hash(password,salt);

   return encryptedPassword
}

exports.comparePassword=async(password,encryptedPassword)=>{
    
        const match=await bcrypt.compare(password,encryptedPassword);
        if(!match){
            throw new AppError(401,"Wrong email or passwoerd")
        }
        return match
    
}
