var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/add', require('./addToQ'));
router.use('/read', require('./readFromQ'));
router.use('/tvp1', require('./tvp1'));
router.use('/transact', require('./transact/transact1'));

module.exports = router;
