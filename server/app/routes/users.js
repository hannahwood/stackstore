'use strict';
const Auth = require('../../utils/auth.middleware');
const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.get('/', Auth.assertAdmin, function(req,res,next) {
  User.find({})
  .then((users) => res.send(users))
  .catch(next);
});

// router.get('/', function(req,res,next) {
//   console.log("REQ: ", req);
//   console.log("REQ: ", req.session);
//   User.find({})
//   .then((users) => res.send(users))
//   .catch(next);
// });





router.get('/:userId', Auth.assertAdminOrSelf, function(req,res,next) {
  User.findById(req.params.userId)
  .then((user) => res.send(user))
  .catch(next);
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
