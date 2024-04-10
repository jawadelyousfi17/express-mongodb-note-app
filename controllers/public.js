const Note = require('../models/note')
const User = require('../models/user')


const getUsers = async (req, res) => {

    try {
        const users = await User.find({}, 'username name _id notes').populate('notes');
        res.render('users', { users });
    } catch (error) {
        
    }

}

const userData = async (req, res,next) => {

    try {
        const user = await User.findOne({username : req.params.username}).populate('notes');
        if(!user) {
            next()
        }
         res.render('user', { user });
    } catch (error) {
        next()

    }

}

module.exports = { getUsers ,userData}