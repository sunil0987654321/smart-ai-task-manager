import Task from '../models/Task.js';

const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  const { title, description, priority, deadline, status } = req.body;

  try {
    const task = new Task({
      user: req.user._id,
      title,
      description,
      priority,
      deadline,
      status
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  const { title, description, priority, deadline, status } = req.body;

  try {
    const task = await Task.findById(req.params.id);

    if (task && task.user.toString() === req.user._id.toString()) {
      task.title = title || task.title;
      task.description = description !== undefined ? description : task.description;
      task.priority = priority || task.priority;
      task.deadline = deadline || task.deadline;
      task.status = status || task.status;

      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404);
      throw new Error('Task not found or user not authorized');
    }
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task && task.user.toString() === req.user._id.toString()) {
      await task.deleteOne();
      res.json({ message: 'Task removed' });
    } else {
      res.status(404);
      throw new Error('Task not found or user not authorized');
    }
  } catch (error) {
    next(error);
  }
};

export { getTasks, createTask, updateTask, deleteTask };
