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


var wipeCollections = function () {
    var removeUsers = User.remove({});
    return Promise.all([
        removeUsers
    ]);
};

var seedUsers = function () {

    var users = [
        {
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
        },
        {
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
        },
            {
            name: 'Admin',
            email: 'admin@admin.com',
            password: 'password',
            type: 'Admin'
        },
    ];
    return User.create(users);
};

let seedProducts = function () {
    let products = [
        {
            title: 'Banana Slicer',
            description: 'This slices all fruits (bananas excepted).',
            price: 3.50,
            invQuantity: 20,
            category: 'Bric-a-brac'
        },
        {
            title: 'Microwave for One',
            description: 'A book that is cold at the beginning and end, but scalding hot in the middle.',
            price: 5.00,
            invQuantity: 100,
            category: 'Bric-a-brac',
        },
        {
            title: 'Lehman Brothers Hat',
            description: 'It is a hat (reverse mortgages sold seperately).',
            price: 50.00,
            invQuantity: 2008,
            category: 'Clothing',

        },
        {
            title: 'Faux Giraffe Fur Onesie',
            description: 'A funsie onesie for children of all ages.',
            price: 100.00,
            invQuantity:5 ,
            category: 'Clothing'
        },
                {
            title: 'Broken candlestick',
            description: 'Needs some TLC to light up your night.',
            price: 20.00,
            invQuantity: 3,
            category: 'Crap'
        },
        {
            title: 'Heely (left)',
            description: 'Perfect if you need a heely for your left foot only.',
            price: 55.00,
            invQuantity: 1,
            category: 'Crap'
        }
    ];
    return Product.create(products);
};

connectToDb
    .then(function () {
        return wipeCollections();
    })
    .then(function () {
        return seedUsers();
    })
    .then( () => seedProducts())
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
