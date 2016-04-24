'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    },
    billingAddress: {
        streetAddress: String,
        unitNum: String,
        city: String,
        state: String,
        postalCode: String,
        country: {
            type: String,
            default: 'United States'
        }
    },
    shippingAddress: {
        streetAddress: String,
        unitNum: String,
        city: String,
        state: String,
        postalCode: String,
        country: {
            type: String,
            default: 'United States'
        }
    },
    phoneNum: String,
    type: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    }
});

// method to remove sensitive information from user objects before sending them out
schema.methods.sanitize = function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
};

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

/*
The findOrCreateOrUpdateUser static returns a promise for a found user, a new user, or an updated user.
The "userObj" passed into the static is the req.body.user object.
Note the userObj should contain key-value pairs that reflect
information inputted by the user while they were checking out.
This information could include their shipping address, or a phone number.
This static will find a user (if they exist), update their information
to reflect the inputs made by the user during checkout, and returns a promise for that updated user.
Otherwise the static will create a new user and return a promise for the created user. This
enables guests to create orders.
*/
schema.statics.findOrCreateOrUpdateUser = function(userObj) {
    return this.findOne({email: userObj.email}) // Find by e-mail because even guest users will be required to submit their e-mail address
    .then(user => {
        if (user) {
            user.set(userObj);
            return user.save();
        }
        return this.create(userObj);
    });
};

mongoose.model('User', schema);
