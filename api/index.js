const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || 'foodshare_secret_key';

const isVercel = process.env.VERCEL === '1';
const uploadDir = isVercel ? '/tmp/uploads' : path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
// Serve uploads statically
app.use('/uploads', express.static(uploadDir));

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// --- Auth Routes ---
app.post('/api/auth/register', (req, res) => {
    const { username, password, full_name, phone_number } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = `INSERT INTO users (username, password, full_name, phone_number) VALUES (?, ?, ?, ?)`;
    db.run(query, [username, hashedPassword, full_name, phone_number], function(err) {
        if (err) return res.status(400).json({ error: 'Username already exists' });
        res.status(201).json({ id: this.lastID });
    });
});

app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM users WHERE username = ?`;
    
    db.get(query, [username], (err, user) => {
        if (err || !user) return res.status(400).json({ error: 'User not found' });
        
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) return res.status(401).json({ error: 'Invalid password' });
        
        const token = jwt.sign({ id: user.id, username: user.username, full_name: user.full_name, phone_number: user.phone_number }, SECRET_KEY);
        res.json({ token, user: { id: user.id, username: user.username, full_name: user.full_name, phone_number: user.phone_number } });
    });
});

// --- Listings Routes ---
app.get('/api/listings', (req, res) => {
    const query = `
        SELECT listings.*, users.full_name as donor_name, users.phone_number as donor_phone 
        FROM listings 
        JOIN users ON listings.donor_id = users.id
        ORDER BY created_at DESC
    `;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/listings', authenticateToken, upload.single('image'), (req, res) => {
    const { food_name, description, quantity, location, event_type } = req.body;
    const donor_id = req.user.id;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const query = `INSERT INTO listings (donor_id, food_name, description, quantity, location, event_type, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.run(query, [donor_id, food_name, description, quantity, location, event_type, image_url], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID });
    });
});

app.post('/api/listings/:id', authenticateToken, upload.single('image'), (req, res) => {
    const { food_name, description, quantity, location, event_type } = req.body;
    const { id } = req.params;
    const donor_id = req.user.id;
    
    let query = `UPDATE listings SET food_name=?, description=?, quantity=?, location=?, event_type=?`;
    let params = [food_name, description, quantity, location, event_type];

    if (req.file) {
        query += `, image_url=?`;
        params.push(`/uploads/${req.file.filename}`);
    }

    query += ` WHERE id=? AND donor_id=?`;
    params.push(id, donor_id);

    db.run(query, params, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(403).json({ error: 'Unauthorized or listing not found' });
        res.json({ message: 'Updated successfully' });
    });
});

app.delete('/api/listings/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const donor_id = req.user.id;

    db.run(`DELETE FROM listings WHERE id=? AND donor_id=?`, [id, donor_id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(403).json({ error: 'Unauthorized or listing not found' });
        res.json({ message: 'Deleted successfully' });
    });
});

// For local development
if (!isVercel) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export the Express app for Vercel
module.exports = app;
