const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require('bcrypt')

const validateUsername = (username) => {
    const usernamePattern = /^[a-z][a-z0-9._-]*$/i;
    return usernamePattern.test(username);
}

const userSchema = new schema({
    username: {
        type: String,
        required: [true, 'please enter an username'],
        unique: true,
        lowercase: true,
        validate: {
            validator: validateUsername,
            message: 'username must contain only alpha numeric and . - _ and must begin with an alphabet'
        },
        minlength: [4, 'Minimum username length is 4 chars']

    },
    password: {
        type: String,
        required: [true, 'please enter password'],
        minlength: [6, 'Minimum password length is 6 chars']

    },
    name: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'note'
    }]
})



userSchema.statics.login = async function (username, password) {
    if (!username || !password) throw Error(100)
    const user = await this.findOne({ username })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) return user
        throw Error(102)
    }
    throw Error(101)
}

module.exports = mongoose.model('user', userSchema)