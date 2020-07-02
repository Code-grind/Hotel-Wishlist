var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  if (req.user === undefined) {
    res.redirect('/login.html');
  }
  else {
    res.redirect('/Dashboard.html');
  }

});

module.exports = router;
