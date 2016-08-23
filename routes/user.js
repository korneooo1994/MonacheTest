var router = require('express').Router();
var User = require('../models/user');
var flash = require('express-flash');
var passport = require('passport');
var passportConf = require('../config/passport');

router.get('/login', function(req, res){
  if (req.user) return res.redirect('/');
  res.render('accounts/login', {message: req.flash('loginMessage')});
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect:'/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/profile', function(req, res, next){
  User.findOne( {_id: req.user._id}, function(err, user){
    if (err) return next(err);
    res.render('accounts/profile', {user: user});
  });
});


router.get('/signup', function(req, res, next){
  res.render('accounts/signup',{
    errors: req.flash('errors')
  });
});

router.post('/signup', function(req,res){
  var user = new User();

  user.profile.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  User.findOne({email: req.body.email}, function(err, existingUser){
    if(existingUser){
  req.flash('errors', 'Email znajduje sie juz w bazie');
      return res.redirect('/signup');
    } else{
      user.save(function(err, user){
        if (err) return next(err);
        req.logIn(user, function(err){
          if (err) return next(err);
          res.redirect('/profile');
        })
        });
    }
  });
});

router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
});

router.get('/edit-profile', function(req, res, next){
  res.render('accounts/edit-profile', {message: req.flash('success')});
});

router.post('/edit-profile', function(req, res, next){
  User.findOne({ _id: req.user._id}, function(err, user){

    if (err) return next(err);

    if (req.body.name) user.profile.name = req.body.name;
    if (req.body.address) user.address = req.body.address;
    if (req.body.email) user.email = req.body.email;

    user.save(function(err){
      if (err) return next(err);
      req.flash('success', 'Successfuly edited your profile');
      return res.redirect("/profile");
    });
  });
});

// router.get('/kolczyk1', function(req, res){
//   res.render('products/kolczyk1');
// });
// router.get('/kolczyk2', function(req, res){
//   res.render('products/kolczyk2');
// });
// router.get('/bransoletka1', function(req, res){
//   res.render('products/bransoletka1');
// });
// router.get('/bransoletka2', function(req, res){
//   res.render('products/bransoletka2');
// });
// router.get('/wisiorek1', function(req, res){
//   res.render('products//wisiorek1');
// });
// router.get('/wisiorek2', function(req, res){
//   res.render('products/wisiorek2');
// });
// router.get('/komplet1', function(req, res){
//   res.render('products/komplet1');
// });
// router.get('/komplet2', function(req, res){
//   res.render('products/komplet2');
// });

module.exports = router;
