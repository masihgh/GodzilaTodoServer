const express = require('express')
const {login,AuthUser} = require('../controllers/authentication')
const verifyUserToken = require('../middlewares/authJWT')
const router = express.Router()

router.post('/login', login)
router.get('/me',verifyUserToken, AuthUser)

module.exports = router