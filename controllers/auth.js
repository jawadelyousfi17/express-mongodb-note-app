const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const User = require('../models/user')
const { signupErrors, loginErrHandler , checkPassword } = require('../errorsHandler/errorsHandler')


// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'jawaddelta', {
        expiresIn: maxAge
    })
}


const signup = async (req , res ) => {
    const { username , password , name} = req.body
    try {
        const isvalid = checkPassword(password)
        console.log('isnt valid')
    } catch (error) {
        console.log(error)
    }
    try { 
        const isvalid = checkPassword(password)
        const salt = await bcrypt.genSalt();
         const hashpassword = await bcrypt.hash(password, salt);
        const user = await User.create({ username, password : hashpassword, name})
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.redirect('/notes')
    } catch (error) {
        res.render('signup' , {
            error : signupErrors(error)
        })
    }
}

const login = async (req , res ) => {
    const { username , password} = req.body
    try {
        const user = await User.login(username, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.redirect('/notes')
    } catch (error) {
        console.log(loginErrHandler(error))
        res.status(400).render('login' , {
            error : loginErrHandler(error)
        })
    }
}

const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/notes');
}

module.exports = { signup , login , logout }