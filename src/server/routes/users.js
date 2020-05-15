const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');


// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  console.log('body', req.body)
  let errors = [];
  
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
  console.log('errors', errors)

  if (errors.length > 0) {
    res.sendStatus(400)
  } else {
    //res.json({})

    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.send(400)
        // res.render('register', {
        //   errors,
        //   name,
        //   email,
        //   password,
        //   password2
        // });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res.sendStatus(201);
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  console.log('authenticating user')
  passport.authenticate('local', (err, user, info) => {
    console.log('user', user)
    if (user) {
      req.logIn(user, function(err) {
        if (err) {
        console.log("Login failed. This is the error message:");
        console.log(err);
        response.status(500).json({message:"Login failed."});
            return;
        }
        console.log("doAuth: Everything worked.");

        return res.json({user})
      });
    } else {
      return res.sendStatus(401)
    }
  })(req, res, next);;
});

// Logout
router.post('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200)
});

// get current user
router.get('/currentUser', (req, res) => {
  console.log('req.user', req.user)
  if (req.user) {
    res.json({
      user: req.user
    })
  } else {
    res.json({})
  }

});

router.put('/:id', (req, res, next) => {
  console.log('updating user')
  User.findByIdAndUpdate(req.params.id, req.body, {}, (err, model) => {
    if (!err) {
      res.status(201).json({
          data: model
      });
  } else {
      res.status(500).json({
          message: "Fail to update user model"
      })
  }
  })

});

module.exports = router;