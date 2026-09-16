
const { prisma } = require("../config/dbpool");


exports.addnewToken = async (userId, token, userAgent, ipAdress, deviceInfo) => {

    const tokenExist = await prisma.refreshToken.findFirst({ where: { userId: userId, userAgent: userAgent } })

    if (tokenExist) {

        const details = await prisma.refreshToken.update({
            where: { id: tokenExist.id },
            data: { token: token, createdAt: new Date(), expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
        })
        return details

    }

    const details = await prisma.refreshToken.create({ data:{ userId: userId, token: token, ipAdress: ipAdress, userAgent: userAgent, deviceInfo: deviceInfo, createdAt: new Date(), expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }});

    return details

}

exports.findtokensByUserId = async (userId) => {
    const details = await prisma.refreshToken.findMany({ where: { userId: userId } })
    return details
}

exports.findToken = async (token) => {
    const details = await prisma.refreshToken.findUnique({ where: { token: token } })
    return details
}
