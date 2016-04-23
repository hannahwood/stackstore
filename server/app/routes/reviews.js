'use strict';
/*global HttpError */

const router = require('express').Router();
module.exports = router;
const mongoose = require('mongoose');
const Review = mongoose.model('Review');
const User = mongoose.model('User');
const Auth = require('../../utils/auth.middleware');

// Saves the document of the user who originally posted the review to the req object.
// This enables the Auth methods to work.
router.param('reviewId', function(req, res, next, reviewId) {
  Review.findById(reviewId)
  .then(function(review) {
    if (!review) throw HttpError(404);
    return User.findById(review.user);
})
  .then(function(user) {
    req.requestedUser = user;
    next();
})
  .catch(next);
});

router.post('/', Auth.assertAuthenticated, function(req, res, next) {
    Review.create(req.body) // Body must include product, user, and rating keys. May include title and description keys.
    .then(review => res.send(review))
    .then(null, next);
});

router.put('/:reviewId', Auth.assertAdminOrSelf, function(req, res, next) {
    Review.findById(req.params.reviewId)
    .then(review => review.set(req.body).save())
    .then(updatedReview => res.json(updatedReview))
    .then(null, next);
});

router.delete('/:reviewId', Auth.assertAdminOrSelf, function(req, res, next) {
    Review.remove({_id: req.params.reviewId})
    .then(() => res.status(204).send())
    .then(null, next);
});
