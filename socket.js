const controller = require('./controller/controller.js');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('search-field', async (input) => {
      const search = await controller.getStart(input);
      const inputNam = [];
      search.forEach((nam) => {
        inputNam.push({ nam });
      });
      socket.emit('search-field', inputNam);
    });
    socket.on('submit', async (input) => {
      let inputNam = null;
      inputNam = await controller.postUsers(input);
      socket.emit('submit', inputNam);
    });
  });
};
