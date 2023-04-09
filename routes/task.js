const express = require('express')
const {getAllTasks, getTask, createTask, updateTask, deleteTask}  = require('../controllers/tasks')
const verifyUserToken = require('../middlewares/authJWT')
const verifyUserAdmin = require('../middlewares/authAdmin')


const router = express.Router()

router.get('/', getAllTasks)
router.get('/:id', verifyUserToken, getTask)
router.post('/', verifyUserToken, createTask)
router.patch('/:id', verifyUserToken, updateTask)
router.delete('/:id', verifyUserToken, deleteTask)


module.exports = router