const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/', function(req, res) {
  console.log('req.body', req.body);
  res.send(req.body);
});

module.exports = router;
