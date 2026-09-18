const { useragent } = require("express-useragent");
const appError = require("../errorHelpers/appError");
const authService = require('../service/authService')
const { catchAsync } = require('../util/catchAsync');
exports.signup = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const result = await authService.signup(email, password)

    res.status(201).json({
        ...result
    })
})
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const userAgent = req.headers['user-agent']
    const ip = req.ip;
    const login = await authService.login(email, password, userAgent, ip)
    res.cookie('access_token', login.accesstoken, { httpOnly: true, sameSite:'strict',   maxAge:15*60*1000});
    res.cookie('refresh_token', login.refreshToken, { httpOnly: true,sameSite:'strict',maxAge:7*24*60*60*1000 })
    res.status(200).json({
        message: login.message,
        email: login.email
    })
})
exports.refresh=catchAsync(async(req, res, next)=>{
const {refresh_token}=req.cookies;
    const userAgent = req.headers['user-agent'];
    const accessToken = await authService.generateAccessToken(refresh_token,userAgent)

    res.cookie('access_token',accessToken.access_token,{httpOnly:true,sameSite:'strict',maxAge:15*60*1000})

    res.sendStatus(200)
})

exports.googleCallback=catchAsync(async(req, res , next)=>{
 const user=req.user;
 const password= null
    const userAgent = req.headers['user-agent']
    const ip = req.ip;
 const handlecallback=await authService.hanldegoogleCallback(user,password,userAgent,ip);
 res.cookie('access_token',handlecallback.access_token,{httpOnly:true,sameSite:'strict',maxAge:15*60*1000})
    res.cookie('refresh_token', handlecallback.refresh_token, { httpOnly: true, sameSite: 'strict', maxAge: 7*24*60*60*1000 });
    res.redirect('http://localhost:8000/health')
})

