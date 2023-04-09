const express = require('express')
const { getAllMembers, getMember, createMember, updateMember, deleteMember } = require('../controllers/members')
const verifyUserToken = require('../middlewares/authJWT')
const uuid = require('uuid');
const multer = require('multer');

const DIR = './public/files/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid.v4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

const router = express.Router()

router.get('/list', getAllMembers)
router.get('/:id', getMember)
router.post('/', upload.single('avatarPhoto'), verifyUserToken, createMember)
router.patch('/:id', upload.single('avatarPhoto'), verifyUserToken, updateMember)
router.delete('/:id', verifyUserToken, deleteMember)


module.exports = router