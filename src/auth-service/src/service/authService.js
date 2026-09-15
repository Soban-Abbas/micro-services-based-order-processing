const userRepository = require("../repository/userRepository");
const { UAParser } = require('ua-parser-js');
const refreshTokenRepository=require("../repository/refreshToken")
const { encryptPassword,comparePassword } = require("../util/encryptPassword")
const AppError = require("../errorHelpers/appError")
const { generateAccesstoken,generateRefreshToken }=require('../util/generatejwt')
const {getDeviceInfo}=require("../util/deviceinfo");
const { useragent } = require("express-useragent");
const { CPU } = require("ua-parser-js/enums");
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

exports.login=async(email,password,userAgent,ip)=>{
    const user=await userRepository.findByEmail(email);
    if(!user){
        throw new AppError(404,"user not found")
    }
    const encryptedPassword=user.password;
    const validPassword=await comparePassword(password,encryptedPassword);

    if(!validPassword){
        throw new AppError(401,'wrong email or password')
    }

    const accesstoken = generateAccesstoken(user.id,user.role);


    const refreshToken=generateRefreshToken(user.id,user.role)

    const parser = new UAParser(userAgent)
    const details=parser.getResult();
    const deviceDetail=details.browser.name+details.device.type+details.os.name
    
    

    const saveRefreshToken = await refreshTokenRepository.addnewToken(user.id, refreshToken,userAgent,ip,deviceDetail)

    return{
        message:"Login Successfull",
        email:user.email,
        token:token
    }


}