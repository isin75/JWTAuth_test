const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const userModel = require('../models/user-model')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dtos')

class UserService {
    async registration(email, password) {
        const candidation = await userModel.findOne({email})
        if (candidation) {
            throw new Error(`${email} already in use`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()

        const user = await userModel.create({email, password: hashPassword, activationLink})
        await mailService.sendActivationMail(email, activationLink)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new UserService()