// YOUR CODE HERE:
var url = "https://api.parse.com/1/classes/chatterbox";
var messages = []; 


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
          _.each(data.results, function(message) {
             messages.push(createMessage(message));
          });
          // debugger;
         },
        error: function (data) {
           console.error('chatterbox: Failed to receive messages');
        }
      });   // end of ajax get  
    },
    renderMessages: function(){
      this.promise.done(function() {
        // debugger;
        for (var i = messages.length - 1; i > messages.length - 20; i--) {
          // debugger;
          var msgHTML=  messages[i].renderMessage();
          $chatSession = $('.chat-session');
          $chatSession.append($(msgHTML));
          $chatSession.prop('scrollTop', $chatSession.prop('scrollHeight'))
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
  var controller = makeController(url);
  setInterval(function() {
    controller.getMessages()
    controller.renderMessages();
  }, 2000);

  $(".chat-input input[type=\"submit\"]").on("click", function(e){
    // debugger;
     e.preventDefault();
     var message = {
      'username': window.location.search.slice(10),  // gets username from url
       'text': $(this).prev().val(),
       'roomname': 'taqueria'
     };
      $(this).prev().val("");
     controller.sendMessage(message);
  })
});
