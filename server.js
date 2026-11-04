const express = require('express');

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Temporary in-memory task storage
let tasks = [];
let nextId = 1;

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to NextAstra Task Manager API!');
});

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({
        application: 'NextAstra Task Manager',
        status: 'healthy'
    });
});

// Get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Get a single task by ID
app.get('/api/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === Number(req.params.id));

    if (!task) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }

    res.json(task);
});

// Create a new task
app.post('/api/tasks', (req, res) => {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).json({
            message: 'Task title is required'
        });
    }

    const newTask = {
        id: nextId++,
        title: title.trim(),
        description: description || '',
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json({
        message: 'Task created successfully',
        task: newTask
    });
});

// Update a task
app.put('/api/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === Number(req.params.id));

    if (!task) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }

    const { title, description, completed } = req.body;

    if (title !== undefined) {
        if (typeof title !== 'string' || !title.trim()) {
            return res.status(400).json({
                message: 'Title must be a non-empty string'
            });
        }
        task.title = title.trim();
    }

    if (description !== undefined) {
        task.description = description;
    }

    if (completed !== undefined) {
        task.completed = completed;
    }

    res.json({
        message: 'Task updated successfully',
        task
    });
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    const index = tasks.findIndex(
        t => t.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({
            message: 'Task not found'
        });
    }

    const deletedTask = tasks.splice(index, 1)[0];

    res.json({
        message: 'Task deleted successfully',
        task: deletedTask
    });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
