const appError=require("../errorHelpers/appError");
const authService=require('../service/authService')
const { catchAsync } =require('../util/catchAsync');
exports.signup = catchAsync(async(req , res, next)=>{
    const{email , password}=req.body;
    const result= await authService.signup(email,password)

    res.status(201).json({
       ...result
    })
})
exports.login=catchAsync(async(req , res ,next)=>{
    const {email,password}=req.body;
    const userAgent = req.headers['user-agent']
    const ip=req.ip;
    const login=await authService.login(email,password,userAgent,ip)
    res.status(200).json({
        ...login
    })
})