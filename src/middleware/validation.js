const { body, param, validationResult } = require('express-validator');

// Validation rules for creating a task
const validateCreateTask = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1, max: 255 })
    .withMessage('Title must be between 1 and 255 characters')
    .trim(),
  body('color')
    .notEmpty()
    .withMessage('Color is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Color must be between 1 and 50 characters')
    .trim(),
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean value')
];

// Validation rules for updating a task
const validateUpdateTask = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Task ID must be a positive integer'),
  body('title')
    .optional()
    .isLength({ min: 1, max: 255 })
    .withMessage('Title must be between 1 and 255 characters')
    .trim(),
  body('color')
    .notEmpty()
    .withMessage('Color is required')
    .isLength({ min: 1, max: 50 })
    .withMessage('Color must be between 1 and 50 characters')
    .trim(),
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean value')
];

// Validation rules for task ID parameter
const validateTaskId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Task ID must be a positive integer')
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  validateCreateTask,
  validateUpdateTask,
  validateTaskId,
  handleValidationErrors
};
