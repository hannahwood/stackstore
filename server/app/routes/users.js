'use strict';
const Auth = require('../../utils/auth.middleware');
const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.param('userId', function(req, res, next, userId) {
  User.findById(userId)
  .then(function(user) {
    if (!user) throw HttpError(404);
    req.requestedUser = user;
    next();
  })
  .catch(next);
});

router.get('/', Auth.assertAdmin, function(req,res,next) {
  User.find({})
  .then((users) => res.send(users))
  .catch(next);
});

// router.get('/:userId', Auth.assertAdminOrSelf, function(req,res,next) {
//   User.findById(req.params.userId)
//   .then((user) => res.send(user))
//   .catch(next);
// });

router.get('/:userId', Auth.assertAdminOrSelf, function(req, res) {
  res.send(req.requestedUser);
});

router.post('/', function(req,res,next) {
  User.create(req.body)
  .then((user) => res.send(user))
  .catch(next);
});

router.delete('/:userId',Auth.assertAdmin,  function(req,res,next) {
  User.findByIdAndRemove(req.params.userId)
  .then(() => res.status(204).end())
  .catch(next);
});

router.put('/:userId',Auth.assertAdminOrSelf,  function(req,res,next) {
  User.findById(req.params.userId)
  .then(function(user) {
    user.set(req.body);
    return user.save();
  })
  .then((user) => res.status(204).send(user))
  .catch(next);
});

module.exports = router;
