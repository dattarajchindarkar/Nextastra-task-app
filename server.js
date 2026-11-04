const path = require('path');
const express = require('express');
const db = require('./database');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health check API
app.get('/health', (req, res) => {
    res.status(200).json({
        application: 'NextAstra Task Manager',
        status: 'healthy'
    });
});

// GET all tasks
app.get('/api/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });
});

// GET task by ID
app.get('/api/tasks/:id', (req, res) => {
    db.get(
        'SELECT * FROM tasks WHERE id = ?',
        [req.params.id],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (!row) {
                return res.status(404).json({ message: 'Task not found' });
            }

            res.json(row);
        }
    );
});

// CREATE a new task
app.post('/api/tasks', (req, res) => {
    const { title, status, assigned_to, due_date } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Task title is required' });
    }

    const sql = `
        INSERT INTO tasks (title, status, assigned_to, due_date)
        VALUES (?, ?, ?, ?)
    `;

    db.run(
        sql,
        [title, status || 'pending', assigned_to || null, due_date || null],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: 'Task created successfully',
                taskId: this.lastID
            });
        }
    );
});

// UPDATE an existing task
app.put('/api/tasks/:id', (req, res) => {
    const { title, status, assigned_to, due_date } = req.body;

    const sql = `
        UPDATE tasks
        SET title = ?, status = ?, assigned_to = ?, due_date = ?
        WHERE id = ?
    `;

    db.run(
        sql,
        [title, status, assigned_to, due_date, req.params.id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (this.changes === 0) {
                return res.status(404).json({ message: 'Task not found' });
            }

            res.json({ message: 'Task updated successfully' });
        }
    );
});

// DELETE a task
app.delete('/api/tasks/:id', (req, res) => {
    db.run(
        'DELETE FROM tasks WHERE id = ?',
        [req.params.id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (this.changes === 0) {
                return res.status(404).json({ message: 'Task not found' });
            }

            res.json({ message: 'Task deleted successfully' });
        }
    );
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
