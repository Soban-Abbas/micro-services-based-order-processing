const jwt = require("jsonwebtoken");
const {secretDetails}=require("../config/config")
exports.generateJwttoken = (id, role) => {
    const payload = {
        id: id,
        role: role
    }
    const secret = secretDetails.jwtSecretKey
    const expiry = {
        expiresIn: '20m',
    }

    const token = jwt.sign(
        payload, secret, expiry
    )

    return token



}