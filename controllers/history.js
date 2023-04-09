const History = require('../model/History')

const getAllHistories = async (req, res) => {
    try {
        const Historys = await History.find({})
        res.status(200).json(Historys.reverse())
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const DeleteAllHistories = async (req, res) => {
    try {
        const Historys = await History.deleteMany({})
        res.status(200).json([])
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const createHistory = (user,action, payload, type) => {
    try {
        const history = {
            action: action,
            payload: payload,
            type: type,
            user: user
        }
        const newHistory = new History(history);
        const insertedHistory = newHistory.save();

    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllHistories,
	DeleteAllHistories,
    createHistory,
}