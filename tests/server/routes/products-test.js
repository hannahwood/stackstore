'use strict';
var mongoose = require('mongoose');
require('../../../server/db/models');
// var User = mongoose.model('User');
var Product = mongoose.model('Product');

var expect = require('chai').expect;

// using testing db
var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');
var Promise = require('bluebird');


describe('Products Route', function() {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	var product1Info = {
		title: 'duck',
		description: 'bird',
		price: 5,
		invQuantity: 20,
		category: 'books'
	};
	var product2Info = {
		title: 'bean',
		description: 'sprout',
		price: 13,
		invQuantity: 2,
		category: 'bric-a-brac'
	};

	// get product(s) -- any user
	describe('gets all products or one product', function() {

		var sampleClient,
			product1,
			product2;

		beforeEach('Create 2 products', function () {
			return Promise.all([
				Product.create(product1Info),
				Product.create(product2Info)
			])
			.spread(function(prod1, prod2){
				product1 = prod1;
				product2 = prod2;
			});

		});

		beforeEach('make sample client', function() {
			sampleClient = supertest.agent(app);

		});


		it('should return one product', function(done) {
			sampleClient.get('/api/products/' + product1._id)
      .expect(200)
			.end(function(err, res) {
        if (err) return done(err);
        expect(res.body.product.title === 'duck')
        done();
      });
		});

		it('should return all products', function(done) {
			sampleClient.get('/api/products')
			.expect(200)
			.end(function(err, res) {
        if (err) return done(err);
        expect(res.body.length).to.equal(2);
        done();
      });
		});
	});


// add and edit products -- only admins

});
