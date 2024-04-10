const { Router } = require('express')
const { addNote , getNotes , get_newNote , edit_get , edit_post} = require('../controllers/note')

const router = Router()

// sign up post
router.post('/new', addNote)
router.get('/' , getNotes)
router.get('/new', get_newNote)
router.get('/edit/:id', edit_get)
router.post('/edit/:id', edit_post)
// router.get('/logout'  , logout)
// router.get('/reset' ,   requireAuth ,userCheck , reset_get)
// router.post('/reset' , userCheck , reset )



module.exports = router