
const express = require('express');
const path = require('path');
const app = express();

const contactRouter = require('./routes/contact');

app.use('/api/contact', contactRouter);

app.use(express.static(path.join(__dirname, 'build')));

app.get(/^\/(?!api).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9001);
