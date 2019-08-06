const express = require('express');
const path = require('path');
const app = express();
const contactRouter = require('./routes/contact');
const weeklyRouter = require('./routes/weekly');

app.set('views', './views');
app.set('view-engine', 'pug');

app.use(express.static(path.join(__dirname, 'build')));
app.use('/contact', contactRouter);
app.use('/weekly', weeklyRouter);

app.get('/', (req, res) => {
  res.set({
    'Cache-Control': 'no-store',
    'Pragma': 'no-cache'
  });
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9001, () => console.log('Listening on port 9001...'));
