var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Order = mongoose.model('Order');

describe('Order model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Order).to.be.a('function');
    });

    describe('order', function () {
        var newOrder = new Order({'user':'571a3f6462a1a760284bb8a1'});
        var product = {'price': '5.00', '_id':'571a3f6462a1a760284bb8a3' };
        var itemArray = [{'product' : product, 'quantity': '2'}];
        describe('create order', function () {
            it('should have createitems func', function () {
                expect(newOrder.createItems).to.be.a('function');
            });

            it('should be able to add items', function () {
                newOrder.createItems(itemArray).then(function(self) {
                    expect(self).to.be.equal(newOrder);
                });
            });

            it('should be able to calculate values', function () {
                newOrder.getTotalCost().then(function(cost) {
                    expect(cost).to.be.equal('10.00');
                });
            });


        });
    });
});
