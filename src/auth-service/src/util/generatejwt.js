const jwt = require("jsonwebtoken");
const {secretDetails}=require("../config/config")
exports.generateAccesstoken = (id, role,expiresIn='15m') => {
    const payload = {
        id: id,
        role: role
    }
    const secret = secretDetails.jwtSecretKey
    const expiry = {
        expiresIn: expiresIn || '15m',
    }

    const token = jwt.sign(
        payload, secret, expiry
    )

    return token



}
exports.generateRefreshToken=(id,role,expiresIn='7d')=>{
    return this.generateAccesstoken(id,role,expiresIn)
}