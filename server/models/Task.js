// Import mongoose for schema and model creation
const mongoose = require('mongoose');

// Define the structure (schema) of the Task collection
const TaskSchema = new mongoose.Schema({
  // Reference to the user who created the task (foreign key to User model)
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  // Title of the task, required for identification
  title: { 
    type: String, 
    required: true, 
    trim: true // removes extra spaces from both ends
  },

  // Optional detailed description of the task
  description: { 
    type: String, 
    trim: true 
  },

  // Optional due date for completing the task
  deadline: { 
    type: Date 
  },

  // Priority level of the task, can only be 'low', 'medium', or 'high'
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high'], // restricts allowed values
    default: 'medium' // if not provided, defaults to 'medium'
  },

  // Current status of the task: pending, in progress, or completed
  status: { 
    type: String, 
    enum: ['pending', 'in progress', 'completed'], 
    default: 'pending' 
  },

  // Timestamp for when the task was created
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Export the model so it can be used in other files (e.g., controllers)
module.exports = mongoose.model('Task', TaskSchema);
