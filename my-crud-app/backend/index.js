// backend/index.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lasin@2004',
    database: 'your_database'
});

db.connect(err => {
    if (err) {
        console.error('Database connection error: ', err);
        return;
    }
    console.log('Database connected');
});

// Routes
app.get('/api/items', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/api/items', (req, res) => {
    const { name, description } = req.body;
    db.query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

app.put('/api/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    db.query('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

app.delete('/api/items/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM items WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
