
const express = require('express')
const {getAllHistories}  = require('../controllers/history')

const router = express.Router()

router.get('/',getAllHistories)


module.exports = router