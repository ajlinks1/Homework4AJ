const controller = require('./controller/controller.js');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('search-field', async (input) => {
      const search = await controller.getStart(input.query);
      const inputNam = [];
      search.forEach((nam) => {
        inputNam.push({ nam });
      });
      socket.emit('search-results', inputNam);
    });
    socket.on('submit', async (input) => {
      let inputNam = null;
      const data = { Name: input.query };

      // check xss

      try {
        inputNam = await controller.postUsers(data);
        socket.emit('submit-results', inputNam);
      } catch (e) {
        console.log(e);
      }
    });
  });
};
