const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

// @route   POST /api/tasks
// @desc    Create a new task
router.post('/', auth, createTask);

// @route   GET /api/tasks
// @desc    Get all user tasks (supports filters and sorting)
router.get('/', auth, getTasks);

// @route   PUT /api/tasks/:id
// @desc    Update an existing task
router.put('/:id', auth, updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
router.delete('/:id', auth, deleteTask);

module.exports = router;
