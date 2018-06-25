'use strict';

const Message = require('../models/message');

module.exports = (io) => {
  io.on('connection', function(socket) {
    socket.on('send-message', async function (data) {
      const message = new Message(data);

      await message.save();
      console.log(message);

      io.emit('receive-message', message);
    });
  });
};
