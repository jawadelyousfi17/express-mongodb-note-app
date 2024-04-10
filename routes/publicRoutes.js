const { Router } = require('express')

const router = Router()

const { getUsers, userData } = require('../controllers/public')

router.get('/', getUsers)
router.get('/:username', userData)



module.exports = router