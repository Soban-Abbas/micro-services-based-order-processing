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
    res.cookie('access_token', login.accesstoken, { httpOnly: true, sameSite:'strict',   maxAge:15*60*1000,  });
    res.cookie('refresh_token', login.refreshToken, { httpOnly: true,sameSite:'strict',maxAge:7*24*60*60*1000 })
    res.status(200).json({
        message: login.message,
        email: login.email
    })
})
exports.refresh=catchAsync(async(req, res, next)=>{
 
})