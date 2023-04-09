const Member = require('../model/Member')
const {createHistory} = require('./history')

const path = require("path");
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const getAllMembers = async (req, res) => {
    try {
        const Members = await Member.find({})
        res.status(200).json(Members)
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const getMember = async (req, res) => {
    try {
        const { id } = req.params;
        const Member = await Member.findById(id);
        return res.status(200).json(Member);
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const createMember = async (req, res) => {

};

const updateMember = async (req, res) => {
    const { id: _id } = req.params
    var obj = req.body

    if(req.files){
        let uploadFile = req.files.avatarPhoto
        const fileName = uploadFile.name
        const fileNameFake = uuidv4();
        const extensionName = path.extname(fileName); // fetch the file extension
        const allowedExtension = ['.png', '.jpg', '.jpeg'];

        if (!allowedExtension.includes(extensionName)) {
            return res.status(422).send("Invalid Image");
        }
        uploadFile.mv(
            `${__dirname}/../public/files/${fileNameFake}${extensionName}`,
            function (err) {
                if (err) {
                    return res.status(500).send(err)
                }
            },
        )
        obj.avatar = fileNameFake+extensionName
    }

    
    try {
        const updatedMember = await Member.findByIdAndUpdate(_id, { ...obj, _id }, { new: true })
        createHistory(req.user.id,'Member', [updatedMember.id,updatedMember.name], 'Update')
        res.status(200).json(updatedMember)

    } catch (error) {
        if(req.files){
            fs.unlink(`${__dirname}/../public/files/${fileNameFake}${extensionName}`, (err) => {
                // if (err) throw err;
                // console.log('File deleted!');
            });
        }
        res.status(500).json({ msg: error });
    }

}

const deleteMember = async (req, res) => {
    const { id: MemberID } = req.params;
    try {
        const member = await Member.findOneAndDelete({ _id: MemberID });
        createHistory(req.user.id,'Member', [member.id,member.name], 'Update')
        res.status(200).json({ delete: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    getAllMembers,
    getMember,
    createMember,
    updateMember,
    deleteMember
}