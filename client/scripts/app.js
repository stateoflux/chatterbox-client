// YOUR CODE HERE:
var url = "https://api.parse.com/1/classes/chatterbox";
var messages = []; 
var rooms = {};
var users = {};
var escapeHtml = function(text, limit) {
  // if (limit === 20){
    // debugger;
  // }
  limit = limit || 200;
  if (text) {
    var newText = text.slice(0, limit);
    var escText = document.createTextNode(newText);
    var p = document.createElement();
    p.appendChild(escText);
    return p.innerHTML;
  }
  return '';
};

var makeController = function() {
  return {
    promise: null,
    getMessages: function() {
      this.promise = $.ajax({
        // always use this url
        url: url + "?order=-createdAt" + "&limit=20",
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
          console.log(data);
          // debugger;
          _.each(data.results, function(message) {
            // debugger;
            if (rooms[message.roomname] === undefined) {
              rooms[message.roomname] = 'not added';
            }
            users[message.username] = true;
            messages.push(createMessage(message));
          });
          // debugger;
         },
        error: function (data) {
           console.error('chatterbox: Failed to receive messages');
        }
      });   // end of ajax get  
    },
    renderMessages: function(room){
      // debugger;
      this.promise.done(function() {
        // debugger;
        for (var i = messages.length - 1; i > messages.length - 20; i--) {
          // debugger;
          var msgHTML=  messages[i].renderMessage(room);
          $chatSession = $('.chat-session');
          if (msgHTML) {
            $chatSession.append($(msgHTML));
            $chatSession.prop('scrollTop', $chatSession.prop('scrollHeight'))
          }
        };   
      });  
    },
  
    sendMessage: function(message) {
       $.ajax({
        // always use this url
        url: url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(message),
        success: function (data) {
          console.log("chatterbox: message sent");
        },
        error: function (data) {
          // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send messages');
        }
      });   // end of ajax post
    }
  }
};

$(document).ready(function() {
  var populateSelect = function() {
    var selectStr = '';
    var escapedRoom = '';
    // debugger;
    _.each(rooms, function(value, room){
      //console.log(room, value);
      if( value === 'not added'){
        escapedRoom = escapeHtml(room, 20);
        selectStr = '<option value="' + escapedRoom + '">' + escapedRoom + '</option>';
        $('.rooms select').append($(selectStr));
        value = 'added';
      }
    });
  }
  // populateSelect();

  var controller = makeController(url);
  setInterval(function() {
    controller.getMessages()
    controller.renderMessages();
    populateSelect();
  }, 2000);
  // populateSelect();

  // Submit button click handler
  // ==========================================================================
  $(".chat-input input[type=\"submit\"]").on("click", function(e){
     e.preventDefault();
     var message = {
      'username': window.location.search.slice(10),  // gets username from url
       'text': $(this).prev().val(),
       'roomname': 'taqueria'
     };
      $(this).prev().val("");
     controller.sendMessage(message);
  })

  // Room pulldown select click handler
  // ==========================================================================





});
