const Member = require('../model/Member')
const { createHistory } = require('./history')



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
    const member = new Member({
        name: req.body.name,
        github: req.body.github,
        linkedin: req.body.linkedin,
        age: req.body.age,
        skills: [req.body.skills],
        desc: req.body.desc,
        is_admin: (req.user.user_is_admin == 'admin') ? req.body.is_admin : 'normal',
        avatar: req.file.filename
    });
    member.save().then(result => {
        res.status(201).json(result)
    }).catch(err => {
        res.status(500).json({
            msg: err
        });
    })

};

const updateMember = async (req, res) => {
    const { id: _id } = req.params
    var obj = req.body

    if(req.file){
        obj.avatar = req.file.filename
    }

    try {
        const updatedMember = await Member.findByIdAndUpdate(_id, { ...obj, _id }, { new: true })
        createHistory(req.user.id, 'Member', [updatedMember.id, updatedMember.name], 'Update')
        res.status(200).json(updatedMember)

    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const deleteMember = async (req, res) => {
    const { id: MemberID } = req.params;
    try {
        const member = await Member.findOneAndDelete({ _id: MemberID });
        createHistory(req.user.id, 'Member', [member.id, member.name], 'Update')
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