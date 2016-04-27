'use strict';

const Auth = require('../../utils/auth.middleware');
const router = require('express').Router();
module.exports = router;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Order = mongoose.model('Order');

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const development = require('../../env/development.js');

const transporter = nodemailer.createTransport("SMTP",{
    service: 'Yahoo',
    auth: {
        user: development.YAHOO.user,
        pass: development.YAHOO.password
    }
});


const stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

router.param('orderId', function(req, res, next, orderId) {
  Order.findById(orderId)
  .populate('user')
  .then(order => {
    req.requestedUser = order.user;
    next();
  })
  .catch(next);
});

// Saves the document associated with the requested user to the req object.
// This enables the Auth middleware to work.
router.use(function(req, res, next) {
    if(req.query.userId){
        User.findById(req.query.userId)
        .then(function(user) {
            if (!user) {
              let err = new Error('User not found');
              err.status = 404;
              throw err;
            }
            req.requestedUser = user;
            next();
        })
        .catch(next);
    } else next();
});


// Get all orders, or all the orders for the requested user
router.get('/', Auth.assertAdminOrSelf, function(req, res, next) {
    var queryObj = {};
    if (req.query.userId) queryObj = {user: req.query.userId};
    Order.find(queryObj)
    .then(orders => {
        res.json(orders);
    })
    .then(null, next);
});

// Get one order
router.get('/:orderId', Auth.assertAdminOrSelf, function(req, res, next) {
    Order.findById(req.params.orderId)
    .populate('cartItems')
    .then(order => res.json(order))
    .then(null, next);
});

// Create a new order.
// Note the req body must contain a user key and a cart key.
// Look at the static in user.js for more information.
router.post('/', function(req, res, next) {
    var stripeToken = req.body.token;
    var charge = stripe.charges.create({
        amount: req.body.cost, // amount in cents, again
        currency: "usd",
        source: stripeToken,
        description: "Example charge",
        receipt_email: req.body.email
    }, function(err, charge) {
        if (err && err.type === 'StripeCardError') {
            console.log(err);
        }
        else {
            User.findOrCreateOrUpdateUser(req.body.user)
            .then(user => Order.create({user: user._id}))
            .then(order => order.createItems(req.body.cart))
            .then(function(order){
                res.json(order);
                // this is needed to get order id for confirmation email
                return order;
            })
            .then(function(order){
                // send confirmation e-mail
                transporter.sendMail({
                    from: 'upcycleny@yahoo.com',
                    to: req.body.user.email,
                    subject: 'Thank you for your Upcycle order!',
                    text: 'Thank you for your order!\n\n' +
                          'You\'re confirmation number is ' + order._id + '.\n\n' +
                          'Please do not hesitate to contact us, if you have any questions.  We live to upcycle and serve!'
                }, function(error, response) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Message sent', response);
                    }
                });
            })
            .then(null, next);
        }
    });
});

// Edit an order (admin only)
router.put('/:orderId', Auth.assertAdmin, function(req, res, next) {
    Order.findById(req.params.orderId)
    .then(order => {
        order.set(req.body);
        return order.save();
    })
    .then(order => {
        console.log('order after save:', order);
        res.json(order);
    })
    .then(null, next);
});
