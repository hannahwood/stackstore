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

console.log("development user & password for Yahoo", development.YAHOO.user, development.YAHOO.password);


const transporter = nodemailer.createTransport("SMTP",{
    service: 'Yahoo',
    auth: {
        user: development.YAHOO.user,
        pass: development.YAHOO.password
    }
});


const stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");


// Saves the document associated with the requested user to the req object.
// This enables the Auth middleware to work.
router.use(function(req, res, next) {
    if(req.query.user) req.requestedUser = req.query.user;
    next();
});

// Get all orders (admin only)
router.get('/', function(req, res, next) {
    if (req.query.user) next(); // If req.query.user is present, use the next route (see below)
    if (!Auth.isAdmin(req)) next(new Error("Not Authenticated")); // If the user isn't an admin, throw an auth error.
    Order.find()
    .then(orders => res.json(orders))
    .then(null, next);
});

// Get all orders for one user.
// This route catches requests that the 'Get all orders' route passes to next()
// because the request had a req.query.user param.
router.get('/', Auth.assertAdminOrSelf, function(req, res, next) {
    Order.find({user: req.query.user})
    .then(orders => res.json(orders))
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
    User.findOrCreateOrUpdateUser(req.body.user)
    .then(user => Order.create({user: user._id}))
    .then(order => order.createItems(req.body.cart))
    .then(function(order) {
        // res.json(order);
        return order;
    })   
    .then(function(order){
        // send confirmation e-mail
        transporter.sendMail({
            from: 'upcycleny@yahoo.com',
            to: req.body.user.email,
            subject: 'Thank you for your Upcycle order!',
            text: 'Thank you for your order!\n' +
                  'You\'re confirmation number is ' + order._id + '\n\n' +
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
        .then(order => res.json(order))
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
