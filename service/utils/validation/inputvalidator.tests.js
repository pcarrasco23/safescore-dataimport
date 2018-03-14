var expect = require('chai').expect;
var inputValidator = require('./inputvalidator');

describe('test int parameter is undefined', function() {
    it('should validate that a message is returned if the input is undefined', function() {

        var parameter = undefined;
        
        var msg = inputValidator.validateIntParam(parameter);

        expect(msg).to.be.not.equal('');
    });
});

describe('test number parameter is undefined', function() {
    it('should validate that a message is returned if the input is undefined', function() {

        var parameter = undefined;
        
        var msg = inputValidator.validateNumberParam(parameter);

        expect(msg).to.be.not.equal('');
    });
});

describe('test parameter is not a string represention of an int', function() {
    it('should validate that a message is returned if the input is not a string representation of int', function() {

        var parameter = '123aaa';
        
        var msg = inputValidator.validateIntParam(parameter);

        expect(msg).to.be.not.equal('');
    });
});

describe('test parameter is a string represention of an int', function() {
    it('should validate that a message is not returned if the input is a string representation of int', function() {

        var parameter = '123';
        
        var msg = inputValidator.validateIntParam(parameter);

        expect(msg).to.be.equal('');
    });
});

describe('test parameter is not a number', function() {
    it('should validate that a message is returned if the input is a number', function() {

        var parameter = '123aaa';
        
        var msg = inputValidator.validateNumberParam(parameter);

        expect(msg).to.be.not.equal('');
    });
});

describe('test parameter is a number', function() {
    it('should validate that a message is not returned if the input is a number', function() {

        var parameter = 40.667;
        
        var msg = inputValidator.validateNumberParam(parameter);

        expect(msg).to.be.equal('');
    });
});