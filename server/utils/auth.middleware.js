'use strict';

// var HttpError = require('./HttpError');

var Auth = {};

Auth.isAuthenticated = function (req) {
  return !!req.user;
};

Auth.isAdmin = function (req) {
  console.log(req);
  return req.user && req.user.type === 'Admin';
};

Auth.isSelf = function (req) {
  return req.user.equals(req.requestedUser);
};

Auth.assert = function (assertion, status) {
  return function (req, res, next) {
    if (assertion(req)) next();
    else next(new Error("Not Authenticated"));
  };
};

Auth.assertAuthenticated = Auth.assert(Auth.isAuthenticated, 401);

Auth.assertAdmin = Auth.assert(Auth.isAdmin);

Auth.assertSelf = Auth.assert(Auth.isSelf);

Auth.assertAdminOrSelf = Auth.assert(function (req) {
  console.log('req:', req);
  return Auth.isAuthenticated(req) && (Auth.isAdmin(req) || Auth.isSelf(req));
});


module.exports = Auth;
