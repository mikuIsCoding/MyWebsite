const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use('/images', express.static('images'));

// Serve the index.html when accessing the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint to serve the drawings page
app.get('/drawings', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'drawings.html'));
});

// API endpoint to fetch images for drawings
app.get('/api/images', (req, res) => {
    fs.readdir('./images', (err, files) => {
        if (err) return res.status(500).send('Error reading images directory');

        const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
        res.json(images);
    });
});

// Serve the resume page
app.get('/resume', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'resume.html'));
});

// Serve the projects page
app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'projects.html'));
});

// Serve the posts page
app.get('/posts', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'posts.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
