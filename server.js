const express = require('express');
const socket = require('socket.io');
const multer = require('multer');
const app = express();
const port = 3000;

const upload = multer({ dest: 'uploads/' });

app.use(express.static('public')); // Serve static files (HTML, CSS, JS)

const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const io = socket(server);

// Chat and video calling logic using WebSocket
io.on('connection', (socket) => {
    console.log('New connection: ', socket.id);

    socket.on('chat-message', (message) => {
        io.emit('chat-message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
