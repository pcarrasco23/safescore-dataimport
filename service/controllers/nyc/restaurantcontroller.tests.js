var expect = require('chai').expect;
var httpMocks = require('node-mocks-http');
const sinon = require('sinon')
const assert = require('assert');
var controller = require('./restaurantcontroller');
var collection = require('../../models/restaurant/restaurantModel').Collection;

describe('findRestaurant no input', function() {
    it('should return bad request status given no input', function() {

        var request  = httpMocks.createRequest({
            method: 'GET',
            url: '/restaurant',
            params: {}
        });

        var response = httpMocks.createResponse();

        controller.findRestaurant(request, response);

        expect(response.statusCode).to.be.equal(400);
    });
});

describe('findRestaurant invalid input', function() {
    it('should return bad request status given invalid input', function() {

        var request  = httpMocks.createRequest({
            method: 'GET',
            url: '/restaurant/aaa',
            params: {
              restaurantId: 'aaa' 
            }
        });

        var response = httpMocks.createResponse();

        controller.findRestaurant(request, response);

        expect(response.statusCode).to.be.equal(400);
    });
});

describe('findRestaurant valid input', function() {
    it('should return OK request status given valid input', function() {

        var request  = httpMocks.createRequest({
            method: 'GET',
            url: '/restaurant/123',
            params: {
              restaurantId: '123'
            }
        });

        var response = httpMocks.createResponse();

        controller.findRestaurant(request, response);

        expect(response.statusCode).to.be.equal(200);
    });
});

describe('findRestaurant calls find method', function() {
    it('should call Mongoose collection findOne method given valid input', function() {

        var request  = httpMocks.createRequest({
            method: 'GET',
            url: '/restaurant/123',
            params: {
              restaurantId: '123'
            }
        });

        var response = httpMocks.createResponse();

        var findStub = sinon.stub(collection, 'findOne').callsFake(function (queryJson) {
        });

        controller.findRestaurant(request, response);

        assert(findStub.called);
        
        collection.findOne.restore();
    });
});

describe('searchByGeocode empty body', function() {
    it('should return bad request status given no input', function() {

        var request  = httpMocks.createRequest({
            method: 'GET',
            url: '/restaurant/searchbygeocode',
            body: {}
        });

        var response = httpMocks.createResponse();

        controller.searchByGeocode(request, response);

        expect(response.statusCode).to.be.equal(400);
    });
});

describe('searchByGeocode invalid input', function() {
    it('should return bad request status given invalid input', function() {

        var request  = httpMocks.createRequest({
            method: 'GET',
            url: '/restaurant/searchbygeocode',
            body: {
              range: 'aaa',
              latitude: 'aaa',
              longitude: 'aaa' 
            }
        });

        var response = httpMocks.createResponse();

        controller.searchByGeocode(request, response);

        expect(response.statusCode).to.be.equal(400);
    });
});

describe('searchByGeocode valid input', function() {
    it('should return OK request status given valid input', function() {

        var request  = httpMocks.createRequest({
            method: 'GET',
            url: '/restaurant/searchbygeocode',
            body: {
              range: 20,
              latitude: 40.5,
              longitude: -73.5 
            }
        });

        var response = httpMocks.createResponse();

        controller.searchByGeocode(request, response);

        expect(response.statusCode).to.be.equal(200);
    });
});

describe('searchByGeocode calls find method', function() {
    it('should call Mongoose collection find method given valid input', function() {

        var request  = httpMocks.createRequest({
            method: 'GET',
            url: '/restaurant/searchbygeocode',
            body: {
                range: 20,
                latitude: 40.5,
                longitude: -73.5 
            }
        });

        var response = httpMocks.createResponse();

        var findStub = sinon.stub(collection, 'find').callsFake(function (queryJson) {
        });

        controller.searchByGeocode(request, response);

        assert(findStub.called);
        
        collection.find.restore();
    });
});


describe('searchByAttribute empty body', function() {
    it('should return bad request status given no input', function() {

        var request  = httpMocks.createRequest({
            method: 'GET',
            url: '/restaurant/searchbyattribute',
            body: {}
        });

        var response = httpMocks.createResponse();

        controller.searchByGeocode(request, response);

        expect(response.statusCode).to.be.equal(400);
    });
});

describe('searchByAttribute invalid input', function() {
    it('should return bad request status given invalid input', function() {

        var request  = httpMocks.createRequest({
            method: 'GET',
            url: '/restaurant/searchbyattribute',
            body: {
              page: 'aaa',
              pageSize: 'aaa',
              name: 'Dunkin'
            }
        });

        var response = httpMocks.createResponse();

        controller.searchByAttribute(request, response);

        expect(response.statusCode).to.be.equal(400);
    });
});

describe('searchByAttribute valid input', function() {
    it('should return OK request status given valid input', function() {

        var request  = httpMocks.createRequest({
            method: 'GET',
            url: '/restaurant/searchbyattribute',
            body: {
              page: 30,
              pageSize: 10,
              name: 'Dunkin'
            }
        });

        var response = httpMocks.createResponse();

        controller.searchByAttribute(request, response);

        expect(response.statusCode).to.be.equal(200);
    });
});

describe('searchByAttribute has no search filters', function() {
    it('should return bad request status when no search filters are provided', function() {

        var request  = httpMocks.createRequest({
            method: 'GET',
            url: '/restaurant/searchbyattribute',
            body: {
              page: 'aaa',
              pageSize: 'aaa'
            }
        });

        var response = httpMocks.createResponse();

        controller.searchByAttribute(request, response);

        expect(response.statusCode).to.be.equal(400);
    });
});

describe('searchByAttribute calls count method', function() {
    it('should call Mongoose collection count method given valid input', function() {

        var request  = httpMocks.createRequest({
            method: 'GET',
            url: '/restaurant/searchbyattribute',
            body: {
                page: 30,
                pageSize: 10,
                name: 'Dunkin'
            }
        });

        var response = httpMocks.createResponse();

        var countStub = sinon.stub(collection, 'count').callsFake(function (queryJson) {
        });

        controller.searchByAttribute(request, response);

        assert(countStub.called);
        
        collection.count.restore();
    });
});
