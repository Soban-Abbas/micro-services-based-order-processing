const userRepository = require("../repository/userRepository")
const { encryptPassword } = require("../util/encryptPassword")
const AppeError = require("../errorHelpers/appError")
exports.signup = async (email, password) => {
    const userExist = await userRepository.findByEmail(email)
    if (userExist) {
        throw new AppeError(409, "Email Already register")
    }

    const encryptedPassword = await encryptPassword(password)
    const registerUser = await userRepository.registerNewUser(email, encryptedPassword, role = 'customer')

    return {
        message: "Registration Successfull ! Login "
    }


}