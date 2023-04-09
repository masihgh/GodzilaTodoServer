const Task = require('../model/Task')
const {createHistory} = require('./history')
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
      createHistory(req.user.id,'Task', [insertedTask.id,insertedTask.task], 'Create')
	  return res.status(201).json(insertedTask);
	  
    } catch (error) {
      res.status(500).json({ msg: error });
    }
};

const updateTask = async (req, res) => {
    const {id: _id} = req.params
    const task = req.body
    
    try {
        const updatedTask = await Task.findByIdAndUpdate(_id, {...task, _id}, {new: true})
        createHistory(req.user.id,'Task', [updatedTask.id,updatedTask.task], 'Update')
        res.status(200).json(updatedTask)
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const deleteTask = async (req, res) => {
    const { id: TaskID } = req.params;
    try {
      const task = await Task.findOneAndDelete({ _id: TaskID });
      createHistory(req.user.id,'Task', [task.id,task.task], 'Delete')
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