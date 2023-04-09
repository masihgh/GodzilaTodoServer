
const express = require('express')
const {getAllHistories,DeleteAllHistories}  = require('../controllers/history')

const router = express.Router()

router.get('/',getAllHistories)
router.delete('/deleteAll',DeleteAllHistories)


module.exports = router