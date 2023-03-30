const express = require('express')
const {login,AuthUser,Logout} = require('../controllers/authentication')
const verifyUserToken = require('../middlewares/authJWT')
const router = express.Router()

router.post('/login', login)
router.get('/me',verifyUserToken, AuthUser)
router.put('/logout', verifyUserToken, Logout)
module.exports = router