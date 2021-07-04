var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({ message: 'asd123' });
});

router.get('/premium', function(req, res, next) {
  res.json({ message: 'premium' });
});

module.exports = router;
