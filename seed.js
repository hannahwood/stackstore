'use strict';

/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
const Product = mongoose.model('Product');


var wipeUsers = function() {
    var removeUsers = User.remove({});
    return Promise.all([
        removeUsers
    ]);
};
var wipeProducts = function() {
    var removeProducts = Product.remove({});
    return Promise.all([
        removeProducts
    ]);
};

var seedUsers = function() {

    var users = [{
        name: 'Crystal C. Canas',
        email: 'CrystalCCanas@inbound.plus',
        password: 'password',
        shippingAddress: {
            streetAddress: '3173 Giraffe Hill Drive',
            city: 'Dallas',
            state: 'TX',
            postalCode: '75207',
        },
        phoneNum: '972-314-3981',
        type: 'User'
    }, {
        name: 'Gail H. Ward',
        email: 'GailHWard@inbound.plus',
        password: 'password',
        shippingAddress: {
            streetAddress: '9 Stratford Drive',
            city: 'Honolulu',
            state: 'HI',
            postalCode: '96814',
        },
        phoneNum: '808-358-9462',
        type: 'User'
    }, {
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'password',
        type: 'Admin'
    }, ];
    return User.create(users);
};

let seedProducts = function() {
    let products = [{
        title: 'Banana Slicer',
        description: 'This slices all fruits (bananas excepted). Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis cursus risus, at venenatis orci ullamcorper quis. Cras tellus orci, posuere at libero sed, molestie vulputate velit.',
        price: 3.50,
        invQuantity: 20,
        category: 'Bric-a-brac',
        photo: 'http://img.ffffound.com/static-data/assets/6/9c154f18428f59962557458082887dfd7a623144_m.jpg'
    }, {
        title: 'Microwave for One',
        description: 'A book that is cold at the beginning and end, but scalding hot in the middle. In at rhoncus mi. Sed quis ultricies lacus. Nullam gravida in ligula vel viverra. Aliquam lorem massa, tristique in ipsum vel, posuere iaculis lectus.',
        price: 5.00,
        invQuantity: 100,
        category: 'Bric-a-brac',
        photo: 'http://eyk.gr/wp-content/uploads/2013/10/lidl-logo-300x3001.png'
    }, {
        title: 'Lehman Brothers Hat',
        description: 'It is a hat (reverse mortgages sold seperately). Aliquam imperdiet, lacus lacinia consequat egestas, turpis elit porttitor dolor, nec placerat erat magna sit amet magna. In auctor nisl et diam sodales, in consequat diam consequat.',
        price: 50.00,
        invQuantity: 2008,
        category: 'Clothing',
        photo: 'http://lazerpro.com/wp-content/uploads/2016/02/os-300x300.png'

    }, {
        title: 'Faux Giraffe Fur Onesie',
        description: 'A funsie onesie for children of all ages. Suspendisse faucibus lectus sit amet lorem feugiat mollis. Cras nisl metus, gravida et urna in, ullamcorper hendrerit eros. Pellentesque consectetur risus eu tempus consectetur. ',
        price: 100.00,
        invQuantity: 5,
        category: 'Clothing',
        photo: 'https://lh3.googleusercontent.com/XWdo7o5d9w8MebEsDlalNI9GyetCsjRSVSVhXK4exlWkuCwaWrBHCrIRTwW8pYByTdE=s300-no'
    }, {
        title: 'Broken candlestick',
        description: 'Needs some TLC to light up your night. Aliquam quis ex sed leo dignissim fermentum. Maecenas massa ipsum, auctor a iaculis vitae, tempor a mauris. Vivamus felis mauris, laoreet quis urna nec, imperdiet malesuada odio.',
        price: 20.00,
        invQuantity: 3,
        category: ['Crap', 'Books', 'Clothing'],
        photo: 'http://oakstreetbootmakers.com/media/catalog/product/cache/1/small_image/302x302/9df78eab33525d08d6e5fb8d27136e95/b/o/boat-brown_1.jpg'
    }, {
        title: 'Heely (left)',
        description: 'Perfect if you need a heely for your left foot only. Integer in nisi faucibus, efficitur leo sit amet, egestas tellus. Suspendisse convallis nec ipsum mollis commodo. ',
        price: 55.00,
        invQuantity: 1,
        category: 'Crap',
        photo: 'http://dogtowndogtraining.com/wp-content/uploads/2012/06/300x300-061-e1340955308953.jpg'
    }];
    return Product.create(products);
};

connectToDb
    .then(function() {
        return wipeUsers();
    })
    .then(function() {
        return wipeProducts();
    })
    .then(function() {
        return seedUsers();
    })
    .then(() => seedProducts())
    .then(function() {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function(err) {
        console.error(err);
        process.kill(1);
    });
