let passport = require('passport');
let Schema = require('../database/schema');
let LocalStrategy = require('passport-local').Strategy;
// var bcrypt = require('bcrypt');
// const saltRounds = 10;

passport.serializeUser(function (user,done) {
    console.log("Serialize");
    console.log(user.id);
    done(null,{
        id: user.id,
    });
});

passport.deserializeUser(function (user,done) {
    console.log("User Deserialize");
    Schema.user.findById(user.id,function (err,user) {
        console.log("start");
        done(err,user);
    });
});

passport.use('local.user',new LocalStrategy({
    usernameField: 'Email',
    passwordField: 'Password',
},function (username,password,done) {
    console.log("name " + username);
    console.log("pass " + password);
    Schema.user.findOne({'Email': username}, function (err, user) {
        if (err) {
            return done(err);
        }
        if(user==null) {
            console.log("Incorrect Email admin");
            return done(null,false,{ message: 'Incorrect Email' })
        }
        if (user.Password!==password) {
            console.log("Wrong password admin");
            return done(null, false, {message: 'Wrong password'})
        }
        return done(null, user);
    });
}));