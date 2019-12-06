const express = require('express');
const app = express();
const cors = require('cors');
// const { ensureAuth } = require('./middleware/ensure-auth');

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(require('cookie-parser')());
app.use(express.json());

app.use(express.static('public'));

// app.use('/api/v1/memes', ensureAuth, require('./routes/memes'));
app.use('/api/v1/stories', require('./routes/stories'));
app.use('/api/v1/chapters', require('./routes/chapters'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
