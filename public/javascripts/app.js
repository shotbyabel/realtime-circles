document.addEventListener("DOMContentLoaded", function() { 


  //our connection to the server
  var socket = io();
  // console.log(socket);
                      //do a call back receive the data
  socket.on('add-circle', function (data) {
  // console.log(data);
    addCircle(data);
  });

    // listen to the server for the `clear-display` event
  socket.on('clear-display', function() {
    circles.innerHTML = '';  
  });

  // listen to the server for when the player list has changed
  socket.on('update-player-list', function (data) {
  //whatever string you pass into join.. takes an array and
  //turns it into a single string.   
  var playerList = '<li>' + data.join('</li><li>') + '</li>';
  players.innerHTML = playerList;
  });
  //''
  var circles = document.getElementById('circles');
  //holds our initials to save em'
  // var circles = document.getElementById('circles');
  //players <ul> element in the footer
  var players = document.getElementById('players');
  var initials = '';

  //
  circles.addEventListener('click', function(evt) {
    // addCircle(evt.clientX, evt.clientY, randomBetween(
      socket.emit('add-circle', {
        initials: initials,
        x: evt.clientX,
        y: evt.clientY,
        dia: randomBetween(10,100),
        rgba: getRandomRGBA()
      });
     });
///
  document.getElementsByTagName('button')[0].addEventListener('click', function() {
    //clear all circles diff pages send an event to the server go to io,js
    socket.emit('clear-display');
    // circles.innerHTML = '';
  });

  while (initials.length < 4 || initials.length > 4) {
    initials = prompt("Please enter your initials").toUpperCase();
    //update //notifies server we registered?
    if (initials.length > 2 && initials.length < 5) {
        socket.emit('register-player', {initials: initials});
    }
  }
//look at line 8 now we pass data instad of that.. 
//function addCircle(x, y, dia, rgba)
function addCircle(data) {
    var el = document.createElement('div');
    el.style.left = data.x - Math.floor(data.dia / 2 + 0.5) + 'px';
    el.style.top = data.y - Math.floor(data.dia / 2 + 0.5) + 'px';
    el.style.width = el.style.height = data.dia + 'px';
    el.style.backgroundColor = data.rgba;
    el.style.fontSize = Math.floor(data.dia / 3) + 'px';
    el.style.color = 'white';
    el.style.textAlign = 'center';
    el.style.lineHeight = data.dia + 'px';
    el.innerHTML = data.initials;
    circles.appendChild(el);
}

  function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getRandomRGBA() {
    return ['rgba(', randomBetween(0, 255), ',', randomBetween(0, 255), ',',
      randomBetween(0, 255), ',', randomBetween(2, 10) / 10, ')'].join(''); 
  }

});
