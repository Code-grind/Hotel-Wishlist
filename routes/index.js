var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	// res.render('index', { title: 'Express' });
	console.log(req.user);
	if (req.user === undefined) {
		res.redirect('/login.html');
	}
	else {
		res.redirect('/UserDashboard.html');
	}

});

module.exports = router;
