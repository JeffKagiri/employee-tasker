const Task = require('../models/Task');

// Create task
exports.createTask = async (req, res) => {
  try {
    const { title, description, deadline, priority } = req.body;
    const task = await Task.create({
      user: req.user.id,
      title,
      description,
      deadline,
      priority
    });
    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all tasks (with filtering and sorting)
exports.getTasks = async (req, res) => {
  try {
    const { status, search, sortBy } = req.query;
    const filter = { user: req.user.id };

    if (status) filter.status = status;
    if (search) filter.title = { $regex: search, $options: 'i' };

    let query = Task.find(filter);

    if (sortBy === 'deadline') query = query.sort({ deadline: 1 });
    if (sortBy === 'priority') query = query.sort({ priority: 1 });

    const tasks = await query;
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    const { title, description, deadline, priority, status } = req.body;

    task.title = title || task.title;
    task.description = description || task.description;
    task.deadline = deadline || task.deadline;
    task.priority = priority || task.priority;
    task.status = status || task.status;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    res.json({ msg: 'Task deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
