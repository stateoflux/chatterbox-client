var createMessage = function(data){
  return {
    username: data.username,
    room: data.roomname,
    text: data.text,
    createdAt: data.createdAt,
    renderMessage: function(){
      // debugger;
      var escapeHtml = function(text) {
        if (text) {
          var newText = text.slice(0, 200);
          var escText = document.createTextNode(newText);
          var p = document.createElement();
          p.appendChild(escText);
          return p.innerHTML;
        }
        return '';
      };

      var messageHtml = '<div class="message"><p class="username">' +
        escapeHtml(this.username) + ' @ ' + '<span class="date">' + moment(this.createdAt).format('lll') + '</span></p><p class="text">' +
        escapeHtml(this.text) + '</p><p>' +
        '</p></div>';
      return messageHtml;

    }  // render
  };   // return
};   // createMessage
