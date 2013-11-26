// YOUR CODE HERE:
var url = "https://api.parse.com/1/classes/chatterbox";
var messages; 
var escapeHtml = function(text) {
  var escText = document.createTextNode(text.slice(0, 200));
  // debugger;
  var p = document.createElement();
  p.appendChild(escText);
  return p.innerHTML;
};

var makeController = function() {
  return {
    getMessages: function() {
      $.ajax({
        // always use this url
        url: url + "?order=-createdAt",
        type: 'GET',
        contentType: 'application/json',
        success: function (data) {
          console.log(data);
          messages = data.results;

          // render messages when complete
          var messageHtml;
          _.each(messages, function(message) {
            messageHtml = '<div class="message"><p class="username">' +
            escapeHtml(message.username) + '</p><p class="text">' +
            escapeHtml(message.text) + '</p><p>' +
            '</p></div>'
            // message.createdAt + "</p></div>"
            $('.chat-session').append($(messageHtml));
          });
        },
        error: function (data) {
          // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to receive messages');
        }
      });   // end of ajax get
    
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
    // renderMessages: function() {
    //   var messageHtml;
    //   _.each(messages, function(message) {
    //     debugger;
    //     messageHtml = "<div><p>" +
    //       message.username + "</p><p>" +
    //       message.text + "</p><p>" +
    //       message.createdAt + "</p></div>"
    //       $('.chat-session').append($(messageHtml));
    //   });
    // } 
  }
};

$(document).ready(function() {
  var controller = makeController(url);
  /* setInterval(function() {
    controller.getMessages();
  }, 2000); */
  controller.getMessages();

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
  // debugger;
  //controller.renderMessages();
});
