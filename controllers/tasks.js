const Task = require('../model/Task')

const getAllTasks = async (req, res) => {
    try {
        const Tasks = await Task.find({})
        res.status(200).json(Tasks)
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const getTask = async (req, res) => {
    try {
	  const { id } = req.params;
	  const task = await Task.findById(id);
	  return res.status(200).json(task);
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const createTask = async (req, res) => {
    try {
	  const newTask = new Task({ ...req.body });
	  const insertedTask = await newTask.save();
	  return res.status(201).json(insertedTask);
	  
    } catch (error) {
      res.status(500).json({ msg: error });
    }
};

const updateTask = async (req, res) => {
    const {id: _id} = req.params
    const Task = req.body
    
    try {
        const updatedTask = await Task.findByIdAndUpdate(_id, {...Task, _id}, {new: true})
        res.status(200).json(updatedTask)
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const deleteTask = async (req, res) => {
    const { id: TaskID } = req.params;
    try {
      await Task.findOneAndDelete({ _id: TaskID });
  
      res.status(200).json({delete:true});
    } catch (error) {
		console.log(error);
      res.status(500).json({ msg: error });
    }
  };

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}