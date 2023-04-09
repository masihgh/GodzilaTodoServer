const express = require('express')
const {getAllMembers,getMember,createMember,updateMember,deleteMember} = require('../controllers/members')
const verifyUserToken = require('../middlewares/authJWT')

const router = express.Router()

router.get('/list', getAllMembers)
router.get('/:id', getMember)
router.post('/', verifyUserToken, createMember)
router.patch('/:id',verifyUserToken, updateMember)
router.delete('/:id',verifyUserToken, deleteMember)


module.exports = router