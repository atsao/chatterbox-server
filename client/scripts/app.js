// YOUR CODE HERE:
//https://api.parse.com/1/classes/chatterbox

// &, <, >, ", ', `, , !, @, $, %, (, ), =, +, {, }, [, and ]

var app = {
  data: {},
  friends: [],
  server: 'http://127.0.0.1:3000',
  userName: (window.location.search).substr(10),
  currentRoom: '',


  init: function(){
    app.fetch();
  },

  send: function(message){
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'POST',
      //add linter to prevent illegal messages
      data: JSON.stringify(message),
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      success: function (data) {
        console.log('Chatterbox: Message sent.');
        app.clearMessages();
        app.fetch();
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
       console.error("Chatterbox: Failed to send message!");
       console.log(textStatus);
       console.log(errorThrown);

  }
    });


  },

  fetch: function(){
    $.ajax({
      url: app.server,
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      data: {order: '-createdAt'},
      success: function(data) {
        // app.data = data;
        // data['results'] = data['results'].sort(function(a,b) {
        //   return a.createdAt < b.createdAt ? -1 : 1;
        // });

        // console.log('sorted data:', data['results']);

        app.sortData(JSON.parse(data))
        // console.log('Data received:', JSON.parse(data));
        $('time.timeago').timeago();
      },

      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.error('chatterbox: Failed to get data');
        console.log(textStatus);
        console.log(errorThrown);
      }
    });
  },

  sortData: function(data) {
    var node = {
      username: '',
      date: new Date(),
      message: '',
      room: ''
    };

    var entityMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "/": '&#x2F;'
    };

    //loop through data
    var chats = data.results;
    // for (var i = 0; i < chats.length; i++) {
    //   for (var k in chats[i]) {
    //     if (k === 'username') {
    //       node.username = chats[i][k];
    //     }
    //     else if (k === 'createdAt') {
    //       node.date = chats[i][k];
    //     }
    //     else if (k === 'roomname') {
    //       node.room = chats[i][k];
    //     }
    //     else if (k === 'text') {
    //       // node.message = JSON.stringify(chats[i][k]).replace('setInterval', '');
    //       node.message = JSON.stringify(chats[i][k]).replace(/[&<>\/]/g, function(char) {
    //         return entityMap[char];
    //       }).replace(/[\'\"]/g, '');
    //       // .escape("&<>\"'`!@$%()=+{}[]")
    //     }
    //     var msg = $('<div>').addClass('message');
    //     msg.append($('<h3>').text(node.username).addClass('username'));
    //     msg.append($('<p>').text(node.message));
    //     // msg.append($('<p>').text(node.date));
    //     console.log(node.date);
    //     console.log(typeof node.date);
    //     msg.append($('<time>').text(node.date.toISOString()).addClass('timeago date').attr('datetime', node.date));
    //     // msg.append($('<p>').text(node.room));

    //   }
    //     $("#chats").append(msg);
    // }
    for (var i = 0; i < chats.length; i++) {
      var msg = $('<div>').addClass('message');
      msg.append($('<h3>').text(chats[i]['username']).addClass('username'));
      msg.append($('<p>').text(chats[i]['text'].replace(/[&<>\/]/g, function(char) {
            return entityMap[char];
          }).replace(/[\'\"]/g, '')));
      // msg.append($('<p>').text(node.date));
      msg.append($('<time>').text((new Date(chats[i]['createdAt']))).addClass('timeago date').attr('datetime', new Date(chats[i]['createdAt']).toISOString()));
      // msg.append($('<p>').text(node.room));
        $("#chats").append(msg);
      
    }
  },

  clearMessages: function() {  
    $('#chats').empty();
  },

  addMessage: function(message) {
    var msg = $('<div>').addClass('message');
    msg.append($('<h3>').addClass('username').text(message.username));
    msg.append($('<p>').text(message.text));
    msg.append($('<p>').text(message.roomname));
    
    $('#chats').append(msg);
    app.send(message);
  },

  addRoom: function(room) {
    var option = $('<option>').text(room);
    $('#roomSelect').append(option);
  },

  addFriend: function(username) {
    app.friends.push(username);
    app.friends = _.uniq(app.friends);
  },


  handleSubmit: function(message) {
    app.send(message);
  },



};

$(document).ready(function() {
  app.init(); // Initialize app
  app.currentRoom = 'lobby';
  $('#room').text(app.currentRoom);
  $('time.timeago').timeago();
  
  $('#clear').on('click', function() {
    app.clearMessages();
  });

  $('#main').on('click', '.username', function() {
    app.addFriend(this.textContent);
    console.log(app.friends);
  });

  $('.submit').on('click', function(e) {
    e.preventDefault();
    var msg = $('#message').val();
    var newMsg = {
      text: msg,
      createdAt: new Date(),
      roomname: 'lobby',
      username: app.userName
      //updatedAt: new Date()
    };

    // console.log(newMsg);
    app.handleSubmit(newMsg);
    $('#message').val('');
  });


});



