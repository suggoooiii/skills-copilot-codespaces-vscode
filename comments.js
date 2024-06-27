// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// Create server
var server = require('http').createServer(app);
// Create socket
var io = require('socket.io')(server);
// Define port
var port = 3000;
// Define array to store comments
var comments = [];
// Define array to store users
var users = [];
// Define array to store user connections
var connections = [];

// Define middleware
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Create route
app.get('/comments', function(req, res){
    res.send(comments);
});

// Create route
app.post('/comments', function(req, res){
    comments.push(req.body);
    io.emit('comment', req.body);
    res.sendStatus(200);
});

// Create route
app.post('/users', function(req, res){
    users.push(req.body);
    io.emit('user', req.body);
    res.sendStatus(200);
});

// Create socket connection
io.on('connection', function(socket){
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
    });
});

// Listen for server
server.listen(port, function(){
    console.log('Server is running on port: ' + port);
});