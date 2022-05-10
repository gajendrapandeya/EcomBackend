const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: [20, 'Name cannot be longer than 20 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        validate: [validator.isEmail, 'Please enter email in correct format'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [8, 'Password should be at least 8 characters long'],
        select: false
    },
    role: {
        type: String,
        default: 'user'
    },
    photo: {
        id: {
            type: String,
            required: true
        },
        secureUrl: {
            type: String,
            required: true
        }
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
})

//Encrypt password before save - Hooks
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
})

//validate the password with the passed on password
userSchema.methods.isValidatedPassword = async function (sentPassword) {
    return await bcrypt.compare(sentPassword, this.password)
}

//create and return jwt token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY })
}

//generate forgot password token(random string)
userSchema.methods.getForgotPasswordToken = function () {
    //generate long and random string
    const forgotToken = crypto.randomBytes(20).toString('hex')
    //getting a hash - make sure to get a hash on backend
    this.forgotPasswordToken = crypto.createHash('sha256').update(forgotToken).digest('hex')

    //ttl
    this.forgotPasswordExpiry = Date.now() + process.env.FORGOT_PASSWORD_EXPIRY

    return forgotToken
}

module.exports = mongoose.model('User', userSchema)