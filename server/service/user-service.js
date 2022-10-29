const UserSchema = require('../models/user-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')

class UserService {
    async registration(email, password) {
        const candidation = await UserSchema.findOne({email})
        if (candidation) {
            throw new Error(`${email} already in use`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const user = await UserSchema.create({email, password: hashPassword, activationLink})
        await mailService.sendActivationMail(email, activationLink)
    }
}

module.exports = new UserService()