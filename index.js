const Express = require('express');

const app = Express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

require('dotenv').config();
const mongoose = require('mongoose');

require('./socket.js')(io);

app.use(Express.json());
app.use(Express.static(`${__dirname}/public`));

(async () => {
  const { ADDRESS } = process.env;
  await mongoose.connect(ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,

  });
  http.listen(process.env.PORT);
})();
module.exports = app;
