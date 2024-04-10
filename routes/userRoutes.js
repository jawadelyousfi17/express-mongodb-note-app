const { Router } = require('express')
const { signup, login, logout } = require('../controllers/auth')
const { loginCheck } = require('../middlware/authCheck')

const router = Router()

// sign up post
router.post('/signup', signup)
router.post('/login', login)


router.get('/login', loginCheck, (req, res) => {
    res.render('login', {
        error: null
    })
})

router.get('/signup', loginCheck, (req, res) => {
    res.render('signup', {
        error: null
    })
})
router.get('/logout', logout)
// router.get('/reset' ,   requireAuth ,userCheck , reset_get)
// router.post('/reset' , userCheck , reset )



module.exports = router