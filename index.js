const express = require('express')
const app = express();
var port = process.env.PORT || 8000;
const server = app.listen(port,()=>{
    console.log(`Listening at  Port ${port}`);
});
// var server = http.createServer(app);
const path = require('path');
const io = require('socket.io')(server);

const users = {};

//Express
app.use('/static',express.static('static'));
app.use(express.urlencoded());
//io.on instanse of the server listening all socket connection
// socket.on listening particular socket connection
console.log("asdf");
io.on('connection',socket =>{

    socket.on('new-user-joined', name=>{
        // console.log("new user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
        socket.emit('userfirst',Object.keys(users).length); //object.ke return array of strings
        socket.broadcast.emit('update-usercount',Object.keys(users).length);
    });
    console.log('asedrftg');
    socket.on('send',message=>{
        socket.broadcast.emit('receive', {message: message,name: users[socket.id]})
    });
    socket.on('disconnect',()=>{
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
        socket.broadcast.emit('update-usercount',Object.keys(users).length);
    });
})
    console.log(__dirname + './index.html');
    app.get('/',function(req,res){
        res.sendFile(path.join(__dirname + '/signupform.html'));
    });
    app.get('/chat',function(req,res){
        res.sendFile(path.join(__dirname + '/index.html'));
    });
