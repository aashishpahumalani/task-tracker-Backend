const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion
} = require('../controllers/taskController');

const {
  validateCreateTask,
  validateUpdateTask,
  validateTaskId,
  handleValidationErrors
} = require('../middleware/validation');

// GET /tasks - Get all tasks
router.get('/', getAllTasks);

// GET /tasks/:id - Get a single task by ID
router.get('/:id', validateTaskId, handleValidationErrors, getTaskById);

// POST /tasks - Create a new task
router.post('/', validateCreateTask, handleValidationErrors, createTask);

// PUT /tasks/:id - Update a task
router.put('/:id', validateUpdateTask, handleValidationErrors, updateTask);

// PATCH /tasks/:id/toggle - Toggle task completion status
router.patch('/:id/toggle', validateTaskId, handleValidationErrors, toggleTaskCompletion);

// DELETE /tasks/:id - Delete a task
router.delete('/:id', validateTaskId, handleValidationErrors, deleteTask);

module.exports = router;
