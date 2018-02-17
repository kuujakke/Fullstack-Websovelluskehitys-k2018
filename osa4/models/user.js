const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique: true
    },
    name: String,
    passwordHash: {
        type: String,
        required: true,
    },
    adult: {
        type: Boolean,
        default: true,
    },
})

userSchema.statics.format = (user) => {
    return {
        id: user._id,
        username: user.username,
        name: user.name,
        adult: user.adult,
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User