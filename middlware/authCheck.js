const jwt = require('jsonwebtoken');
const User = require('../models/user')

const requireAuth = (req , res , next ) => {
    const token = req.cookies.jwt
    if(token) {
        jwt.verify(token , 'jawaddelta' , (err , decodedToken) => {
            if(err) {
                console.log('error token')
                res.redirect('/login')
              
            }  else {
                next()
            }
           
        } )
    } else {
        console.log('error token')
                res.redirect('/login')
    }
}

const loginCheck = (req , res , next ) => {
    const token = req.cookies.jwt
    if(token) {
        jwt.verify(token , 'jawaddelta' , (err , decodedToken) => {
            if(err) {
                next()
              
            }  else {
                res.redirect('/')
            }
           
        } )
    } else {
        next()
    }
}

const userCheck = (req , res , next ) => {
    const token = req.cookies.jwt
    if(token) {
        jwt.verify(token , 'jawaddelta' ,async (err , decodedToken) => {
            if(err) {
                next()
                res.locals.user = null
            }  else {
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        } )
    } else {
        res.locals.user = null
        next()
    }
}



module.exports = {requireAuth , loginCheck , userCheck}