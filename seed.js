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
const Review = mongoose.model('Review');


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
var wipeReviews = function() {
    var removeReviews = Review.remove({});
    return Promise.all([
        removeReviews
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
    let products = [
    {
        title: 'Dr. Schoallz Limited Edition Sandals',
        description: 'ONE SIZE FITS ALL. \nInteger in nisi faucibus, efficitur leo sit amet, egestas tellus. Suspendisse convallis nec ipsum mollis commodo. ',
        price: 82.50,
        invQuantity: 115,
        category: 'Clothing',
        photo: 'https://farm2.staticflickr.com/1644/25993125573_7e24d1464e_z.jpg'
    }, {
        title: '"Creepy Cookies", the Novel',
        description: 'Your cookies not creepy enough? BUY THIS BOOK. \nInteger in nisi faucibus, efficitur leo sit amet, egestas tellus. Suspendisse convallis nec ipsum mollis commodo. ',
        price: 55.00,
        invQuantity: 10,
        category: 'Books',
        photo: 'https://farm2.staticflickr.com/1641/25990986064_7d56123108_z.jpg'
    }, {
        title: 'Bart Simpson\'s Head',
        description: 'Don\'t ask us how we got this. \n Aliquam imperdiet, lacus lacinia consequat egestas, turpis elit porttitor dolor, nec placerat erat magna sit amet magna. In auctor nisl et diam sodales, in consequat diam consequat.',
        price: 129.99,
        invQuantity: 200,
        category: ['Bric-a-brac', 'Crap'],
        photo: 'https://farm2.staticflickr.com/1682/25990985934_3dea6ca41f_z.jpg'

    }, {
        title: 'Empty Gatorade Bottle (\'09 edition)',
        description: 'Collector\'s item. \nSuspendisse faucibus lectus sit amet lorem feugiat mollis. Cras nisl metus, gravida et urna in, ullamcorper hendrerit eros. Pellentesque consectetur risus eu tempus consectetur. ',
        price: 15.00,
        invQuantity: 5,
        category: ['Bric-a-brac', 'Crap'],
        photo: 'https://farm2.staticflickr.com/1533/25993125223_ede41a976f_z.jpg'
    }, {
        title: 'Designer Duane Reade Satchel',
        description: 'Designed by Duane himself in 1989. \nAliquam quis ex sed leo dignissim fermentum. Maecenas massa ipsum, auctor a iaculis vitae, tempor a mauris. Vivamus felis mauris, laoreet quis urna nec, imperdiet malesuada odio.',
        price: 42.00,
        invQuantity: 45,
        category: 'Clothing',
        photo: 'https://farm2.staticflickr.com/1643/25990986004_ea424ac7e1_z.jpg'
    }, {
        title: '"Pond Life" (Revised and Updated)',
        description: 'Always wanted a coffee table book with geese on the front cover? Look no further!. \nInteger in nisi faucibus, efficitur leo sit amet, egestas tellus. Suspendisse convallis nec ipsum mollis commodo. ',
        price: 52.00,
        invQuantity: 100,
        category: 'Books',
        photo: 'https://farm2.staticflickr.com/1686/25990986084_a937d36208_z.jpg'
    }, {
        title: '16 Blue Poker Chips (red chips sold separately)',
        description: 'Trade these in at any casino for REAL CASH. \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis cursus risus, at venenatis orci ullamcorper quis. Cras tellus orci, posuere at libero sed, molestie vulputate velit.',
        price: 49.99,
        invQuantity: 20,
        category: ['Bric-a-brac', 'Crap'],
        photo: 'https://farm2.staticflickr.com/1578/25993125113_d9fc91d2fc_z.jpg'
    }, {
        title: '"Napkin Folding" (comes with napkin)',
        description: 'Linda Barker slays in this coming of age book. \nInteger in nisi faucibus, efficitur leo sit amet, egestas tellus. Suspendisse convallis nec ipsum mollis commodo. ',
        price: 119.98,
        invQuantity: 88,
        category: 'Books',
        photo: 'https://farm2.staticflickr.com/1466/25993125403_de1f1c5b02_z.jpg'
    }, {
        title: 'THE Donut Feather',
        description: 'This is THE feather of THE Donut. THE DONUT. \nInteger in nisi faucibus, efficitur leo sit amet, egestas tellus. Suspendisse convallis nec ipsum mollis commodo. ',
        price: 2005.00,
        invQuantity: 1,
        category:['Clothing', 'Bric-a-brac'],
        photo: 'https://farm2.staticflickr.com/1694/25990986234_a47a7cfb77_z.jpg'
    }, {
        title: 'Zagat New Jersey Restaurants 2008/2009',
        description: 'SOOOOOO much better than 2011/2012 version. This one\'s a classic. \nInteger in nisi faucibus, efficitur leo sit amet, egestas tellus. Suspendisse convallis nec ipsum mollis commodo. ',
        price: 5.00,
        invQuantity: 1000,
        category: 'Books',
        photo: 'https://farm2.staticflickr.com/1663/25993125463_41d749c0e2_z.jpg'
    }, {
        title: 'Baker\'s Twine',
        description: 'Tired of your baker doing a terrible job tying up your donut boxes? Do it yourself with this limited edited Baker\'s Twine. \nInteger in nisi faucibus, efficitur leo sit amet, egestas tellus. Suspendisse convallis nec ipsum mollis commodo. ',
        price: 33.50,
        invQuantity: 400,
        category: ['Crap', 'Clothing'],
        photo: 'https://farm2.staticflickr.com/1692/25993125523_5c1ab25355_z.jpg'
    }, {
        title: 'Sparkly Purple Toothbrush',
        description: 'Clean those teeth! \nInteger in nisi faucibus, efficitur leo sit amet, egestas tellus. Suspendisse convallis nec ipsum mollis commodo. ',
        price: 4.50,
        invQuantity: 60,
        category: 'Crap',
        photo: 'https://farm2.staticflickr.com/1562/25993125543_6fa3bb6ebb_z.jpg'
    }, {
        title: 'Basket',
        description: 'Do NOT get wet. \nInteger in nisi faucibus, efficitur leo sit amet, egestas tellus. Suspendisse convallis nec ipsum mollis commodo. ',
        price: 72.00,
        invQuantity: 80,
        category: 'Bric-a-brac',
        photo: 'https://farm2.staticflickr.com/1595/25990986304_f9b63d3c8e_z.jpg'
    }, {
        title: 'Blow-torch Tip (blow-torch not included)',
        description: 'Works as an okay back-scratcher. \nInteger in nisi faucibus, efficitur leo sit amet, egestas tellus. Suspendisse convallis nec ipsum mollis commodo. ',
        price: 17.99,
        invQuantity: 66,
        category: ['Bric-a-brac', 'Crap'],
        photo: 'https://farm2.staticflickr.com/1539/25993125673_854df8f588_z.jpg'
    }, {
        title: 'Toothpaste Squeezer',
        description: '"Adams is leading a new fascinating world of bathroom." \nInteger in nisi faucibus, efficitur leo sit amet, egestas tellus. Suspendisse convallis nec ipsum mollis commodo. ',
        price: 16.50,
        invQuantity: 135,
        category: ['Bric-a-brac', 'Crap'],
        photo: 'https://farm2.staticflickr.com/1686/25993125753_5cd747a8ac_z.jpg'
    }, {
        title: 'Plastic Knife, Fork, Spoon Set',
        description: 'From some Chinese takeout place in New York City. \nIn at rhoncus mi. Sed quis ultricies lacus. Nullam gravida in ligula vel viverra. Aliquam lorem massa, tristique in ipsum vel, posuere iaculis lectus.',
        price: 8.00,
        invQuantity: 100,
        category: 'Crap',
        photo: 'https://farm2.staticflickr.com/1694/25993125863_f57a7c5418_z.jpg'
    }

    ];
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
        return wipeReviews();
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
