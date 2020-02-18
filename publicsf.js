const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.set({
    'Cache-Control': 'no-store',
    'Pragma': 'no-cache'
  });
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9001, () => console.log('Listening on port 9001...'));
