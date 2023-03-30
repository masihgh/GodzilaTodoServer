const History = require('../model/History')

const getAllHistories = async (req, res) => {
    try {
        const Historys = await History.find({})
        res.status(200).json(Historys)
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const createHistory = async () => {
    try {
	  const newHistory = new History({ ...req.body });
	  const insertedHistory = await newHistory.save();
	  return res.status(201).json(insertedHistory);
	  
    } catch (error) {
      res.status(500).json({ msg: error });
    }
};

module.exports = {
    getAllHistories,
    createHistory,
}