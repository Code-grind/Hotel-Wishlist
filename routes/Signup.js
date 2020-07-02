let express = require('express');
let router = express.Router();
let Schema = require('../database/schema');
// let bcrypt = require('bcrypt');
// require('dotenv/config');
router.post('/', function (req, res) {
	console.log(req.body);
	let userSchema = Schema.user({
		FullName: req.body.FullName,
		Email: req.body.Email,
		Password: req.body.Password,
		Wishlist: []
	});
	userSchema.save(function (err, data) {
		if (err) throw err;
	});
	res.send("Your account has been created. Login to use your account.")
});

/* GET home page. */
router.get('/', function (req, res, next) {
	// res.render('index', { title: 'Express' });
	res.redirect('/adminRegister.html');
});

module.exports = router;
