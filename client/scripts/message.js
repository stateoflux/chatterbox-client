var createMessage = function(data){
  return {
    username: data.username,
    room: data.roomname,
    text: data.text,
    createdAt: data.createdAt,
    renderMessage: function(room){
      // debugger;
      room = room || 'all_rooms';
      var messageHtml = '<div class="message"><p class="username">' +
        escapeHtml(this.username, 50) + ' @ ' + '<span class="date">' + moment(this.createdAt).format('lll') + '</span></p><p class="text">' +
        escapeHtml(this.text) + '</p><p>' +
        '</p></div>';
      if (room === this.room || room === "all_rooms") {
        return messageHtml;
      } else  {
        return '';
      }
    }  // render
  };   // return
};   // createMessage
