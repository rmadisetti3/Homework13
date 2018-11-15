const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://user:password1@ds161890.mlab.com:61890/heroku_m3dnwtg8', { useNewUrlParser: true });


require('./sockets/message-sockets')(io);
// Routes
// API Routes (require from routes file and pass in Express app)
require('./routes/api-routes')(app);
// HTML Routes (require from routes file and pass in Express app)
require('./routes/html-routes')(app);

// Start the server
app.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
});
