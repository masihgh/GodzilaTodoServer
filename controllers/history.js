const History = require('../model/History')

const getAllHistories = async (req, res) => {
    try {
        const Historys = await History.find({})
        res.status(200).json(Historys)
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const createHistory = async (user,action, payload, type) => {
    try {
        const History = {
            action: action,
            payload: payload,
            type: type,
            user: user
        }
        const newHistory = new History(History);
        const insertedHistory = await newHistory.save();
        return true;

    } catch (error) {
        return false;
    }
};

module.exports = {
    getAllHistories,
    createHistory,
}