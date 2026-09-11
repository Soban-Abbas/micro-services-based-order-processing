const bcrypt= require("bcrypt");
exports.encryptPassword=async(password)=>{
   const salt =10;
   const encryptedPassword=await bcrypt.hash(password,salt);

   return encryptedPassword
}