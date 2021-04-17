const Model = require('../models/users.js');

module.exports = (io) => {
  const query = async (data) => {
    const queryResult = await Model.aggregate([])
      .search({
        autocomplete: {
          path: 'title',
          query: data,
        },
      })
      .limit(5);
    return queryResult;
  };
  io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('query', (data) => query(data)
      .then((result) => socket.emit('query-result', result))
      .catch((err) => console.error(err)));
  });

  const socket = io();

  const input = document.getElementById('search-field');
  input.addEventListener('input', () => socket.emit('query', input.value));

  socket.on('query-result', (result) => console.dir(result));
};
