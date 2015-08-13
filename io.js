var io = require('socket.io')();

var players = {};
//we now have an io object.. is our 
//sever side io socket.. lets hook up a listener
//by using the 'on' using a call back function
io.on('connection', function (socket) {
  // console.log('Client connected to socket.io!');
      
    // socket.on('add-circle', function (data) {
        socket.on('register-player', function (data) {
        //new key on our players object
         // assigning true is arbitrary, we just need to create a key
        players[data.initials] = true;
        //why not just use this socket object?
        //so that we know when players disc.
        socket.initials = data.initials;
            //on the obj constructor. there's a method called keys
            //u pass in an obj.. it goes into them and it abstracts 
           // and array key? what? what does this do? WTF?
        io.emit('update-player-list', Object.keys(players));
      });

        socket.on('add-circle', function (data) {
        io.emit('add-circle', data);
        });

        socket.on('clear-display', function () {
        io.emit('clear-display');
        });

        // when the player disconnects, remove key & notify clients
        socket.on('disconnect', function (data) {  
        //how we delete a property in an object?
        delete players[socket.initials]
        io.emit('update-player-list', Object.keys(players));
      });
});





module.exports = io;