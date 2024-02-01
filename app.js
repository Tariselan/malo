const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

const db = new sqlite3.Database('mydatabase.db');

// Use morgan for logging
// app.use(morgan('combined')); // uncomment to turn on server side logging

app.use(bodyParser.json());
app.use(express.static('public'));

// Get all items
app.get('/items', (req, res) => {
    db.all('SELECT * FROM items ORDER BY title;', (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(rows);
    });
});

// Add an item
app.post('/items', (req, res) => {
    const { title, description, note } = req.body;
    console.log('Received POST request to /items');

    db.run('INSERT INTO items (title, description, note) VALUES (?, ?, ?)', [title, description, note], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Item added successfully' });
    });
});


// Update an item
app.put('/items/:id', (req, res) => {
    const id = req.params.id;
    const { title, description, note} = req.body;
    db.run('UPDATE items SET title = ?, description = ?, note = ? WHERE id = ?', [title, description, note, id], (err) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json({ message: 'Item updated successfully' });
    });
});

// Delete an item
app.delete('/items/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM items WHERE id = ?', [id], (err) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json({ message: 'Item deleted successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
