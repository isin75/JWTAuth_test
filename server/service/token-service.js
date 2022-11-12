const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token-model')

class TokenSrvice {
    generateTokens(payLoad) {
        const accessToken = jwt.sign(payLoad, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' })
        const refreshToken = jwt.sign(payLoad, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await tokenModel.create({user: userId, refreshToken})
        return token
    }

    async removeToken(refreshToken) {
        const tokenData = await tokenModel.deleteOne({refreshToken})
        return tokenData
    }
}

module.exports = new TokenSrvice()