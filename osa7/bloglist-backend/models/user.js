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
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
})

userSchema.statics.format = (user) => {
    return {
        id: user._id,
        username: user.username,
        name: user.name,
        adult: user.adult,
        blogs: user.blogs
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User