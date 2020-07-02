let express = require('express');
let passport = require('passport');
let router = express.Router();

router.post('/',passport.authenticate(['local.user'],{failureRedirect: '/'}),function (req,res) {
  console.log('HERE ')
  console.log(req.user);
  // res.send('you are now logged in..');
  res.redirect('/UserDashboard.html');
});

module.exports = router;
