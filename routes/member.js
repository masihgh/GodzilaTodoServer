const express = require('express')
const {getAllMembers,getMember,createMember,updateMember,deleteMember} = require('../controllers/members')

const router = express.Router()

router.get('/list', getAllMembers)
router.get('/:id', getMember)
router.post('/', createMember)
router.patch('/:id', updateMember)
router.delete('/:id', deleteMember)


module.exports = router