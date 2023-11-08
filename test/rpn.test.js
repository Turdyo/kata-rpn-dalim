const expect = require('chai').expect;
const evaluateRPN = require('../src/rpn');


describe('RPN', function () {
    describe('normal cases', function () {
        describe('should work with +', function () {
            it('should work with two numbers', function () {
                expect(evaluateRPN('9 11 +')).to.equal(20);
            });
            it('should work with more than two numbers', function () {
                expect(evaluateRPN('9 11 12 + +')).to.equal(32);
            });
        });
        describe('should work with -', function () {
            it('should work with two numbers', function () {
                expect(evaluateRPN('9 11 -')).to.equal(-2);
            });
            it('should work with more than two numbers', function () {
                expect(evaluateRPN('9 11 12 - -')).to.equal(-14);
            });
        });
        describe('should work with *', function () {
            it('should work with two numbers', function () {
                expect(evaluateRPN('9 11 *')).to.equal(99);
            });
            it('should work with more than two numbers', function () {
                expect(evaluateRPN('9 11 12 * *')).to.equal(1188);
            });
        });
        describe('should work with /', function () {
            it('should work with two numbers', function () {
                expect(evaluateRPN('99 9 /')).to.equal(11);
            });
            it('should work with more than two numbers', function () {
                expect(evaluateRPN('120 2 6 / /')).to.equal(10);
            });
            it('should return int if result is float', function () {
                expect(evaluateRPN('9 2 /')).to.be.an(4);
            });
        });
    });

    describe('edge cases', function () {
        it('some test', function () {
            expect(1).to.equal(1);
        });
    });
});
