const userRepository = require("../repository/userRepository")
const { encryptPassword,comparePassword } = require("../util/encryptPassword")
const AppError = require("../errorHelpers/appError")
const { generateJwttoken }=require('../util/generatejwt')
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

exports.login=async(email,password)=>{
    const user=await userRepository.findByEmail(email);
    if(!user){
        throw new AppError(404,"user not found")
    }
    const encryptedPassword=user.password;
    const validPassword=await comparePassword(password,encryptedPassword);

    if(!validPassword){
        throw new AppError(401,'wrong email or password')
    }

    const token = generateJwttoken(user.id,user.role)

    return{
        message:"Login Successfull",
        email:user.email,
        token:token
    }


}