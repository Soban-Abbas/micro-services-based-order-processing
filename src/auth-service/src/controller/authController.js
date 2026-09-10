const appError=require("../errorHelpers/appError");
const authService=require('../service/authService')
const { catchAsync } =require('../util/catchAsync');
exports.signup = catchAsync(async(req , res , next)=>{
    const{name, email , password}=req.body;
    return await authService.signup(name,email,password)
})