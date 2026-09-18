const userRepository = require("../repository/userRepository");
const {secretDetails}=require("../config/config")
const jwt=require("jsonwebtoken")
const { UAParser } = require('ua-parser-js');
const refreshTokenRepository = require("../repository/refreshToken")
const { encryptPassword, comparePassword } = require("../util/encryptPassword")
const AppError = require("../errorHelpers/appError")
const { generateAccesstoken, generateRefreshToken } = require('../util/generatejwt')
const { getDeviceInfo } = require("../util/deviceinfo");
const { useragent } = require("express-useragent");
const { CPU } = require("ua-parser-js/enums");
const { token } = require("morgan");
const { use } = require("passport");
exports.signup = async (email, password) => {
    const userExist = await userRepository.findByEmail(email)
    if (userExist) {
        throw new AppError(409, "Email Already register")
    }

    const encryptedPassword = await encryptPassword(password)
    const registerUser = await userRepository.registerNewUser(email, encryptedPassword, role = 'customer')

    return {
        message: "Registration Successfull ! Login "
    }


}



exports.login = async (email, password, userAgent, ip) => {
    
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new AppError(404, "user not found register first")
    }
    if(!password){
        throw new AppError(401,"Please enter valid password")
    }
    if(user.password===null){
        throw new AppError(400, 'This account uses Google Sign - In.Please continue with Google')
    }
    const encryptedPassword = user.password;
    const validPassword = await comparePassword(password, encryptedPassword);

    if (!validPassword) {
        throw new AppError(401, 'wrong email or password')
    }

    const accesstoken = generateAccesstoken(user.id, user.role);


    const refreshToken = generateRefreshToken(user.id, user.role)

    const parser = new UAParser(userAgent)
    const details = parser.getResult();
    const deviceDetail = details.browser.name + details.device.type + details.os.name || "Device info not found"



    const saveRefreshToken = await refreshTokenRepository.addnewToken(user.id, refreshToken, userAgent, ip, deviceDetail)

    return {
        message: "Login Successfull",
        email: user.email,
        accesstoken: accesstoken,
        refreshToken: refreshToken
    }


}


exports.generateAccessToken=async(refreshToken,userAgent)=>{

    if(!refreshToken){
        throw new AppError(401, "Please Login")
    }

const ValidToken=await refreshTokenRepository.findByToken(refreshToken,userAgent)
if(!ValidToken){
throw new AppError(401, "Please Login First")
}

if(ValidToken.expiresAt<new Date()){
    const deleteToken = await refreshTokenRepository.deleteById(ValidToken.id)

    throw new AppError(401,'Please Login First')
}

const decode = jwt.verify(refreshToken,secretDetails.jwtSecretKey)

const access_token= generateAccesstoken(decode.id,decode.role,'15m')

return {
    
    access_token:access_token
}

}



exports.hanldegoogleCallback = async (user,password, userAgent,ip)=>{
const finduser=await userRepository.findByEmail(user.email);
if(!finduser){
    throw new AppError( 400, "Please Register Account first")
}
if(finduser.password!==null){
throw new AppError(401,`Please login with email and passoword : ${'http://localhost/api/auth/login'} `)
}

const access_token = generateAccesstoken(user.id,user.role)
const refresh_token=generateRefreshToken(user.id,user.role);

    const parser = new UAParser(userAgent)
    const details = parser.getResult();
    const deviceDetail = details.browser.name + details.device.type + details.os.name || "Device info not found"
const saveRefreshToken = await refreshTokenRepository.addnewToken(user.id,refresh_token,userAgent,ip,deviceDetail);

return {
    message:"Login Successfull",
    email:user.email,
    refresh_token:refresh_token,
    access_token:access_token
}
}