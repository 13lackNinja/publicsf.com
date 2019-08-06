const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('weekly.pug', { title: 'Hey', message: 'Hello there!' });
});

module.exports = router;
