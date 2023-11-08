const expect = require('chai').expect;
const evaluateRPN = require('../src/rpn');


describe('RPN', function () {
    describe('normal cases', function () {
        describe('should work with +', function () {
            it('should work with two numbers', function () {
                expect(evaluateRPN('9 11 +')).to.equal('20');
            });
            it('should work with more than two numbers', function () {
                expect(evaluateRPN('9 11 12 + +')).to.equal('32');
            });
        });
        describe('should work with -', function () {
            it('should work with two numbers', function () {
                expect(evaluateRPN('9 11 -')).to.equal('-2');
            });
            it('should work with more than two numbers', function () {
                expect(evaluateRPN('9 11 12 - -')).to.equal('-14');
            });
        });
        describe('should work with *', function () {
            it('should work with two numbers', function () {
                expect(evaluateRPN('9 11 *')).to.equal('99');
            });
            it('should work with more than two numbers', function () {
                expect(evaluateRPN('9 11 12 * *')).to.equal('1188');
            });
        });
        describe('should work with /', function () {
            it('should work with two numbers', function () {
                expect(evaluateRPN('99 9 /')).to.equal('11');
            });
            it('should work with more than two numbers', function () {
                expect(evaluateRPN('120 2 6 / /')).to.equal('10');
            });
            it('should return int if result is float', function () {
                expect(evaluateRPN('9 2 /')).to.be.an('4');
            });
            it('should return error if divide by 0', function () {
                expect(evaluateRPN('9 0 /')).to.be.an('Error: division by zero');
            });
        });
    });

    describe('edge cases', function () {
        it("should accept only numbers and operators", function () {
            expect(evaluateRPN('a 1 +')).to.be.an('Error: expecting only numbers and operators, got `a`');
        });
        it('should return 0 when the input is empty', function () {
            expect(evaluateRPN('')).to.equal('0');
        });
        it('should return the number if the input is only one number', function () {
            expect(evaluateRPN('9')).to.equal('9');
        });
        it('should return error if the input contains one number and one operator', function () {
            expect(evaluateRPN('9 +')).to.be.an('Error: expecting two arguments for `+`, got one (9)');
        });
        it('should not accept an operator at first', function () {
            expect(evaluateRPN('+ 9')).to.be.an('Error: expecting two arguments for `+`, get none ()');
        });
        it('should not accept an operator that is not at the end', function () {
            expect(evaluateRPN('11 + 9')).to.be.an('Error: expecting two arguments for `+`, get one (11)');
        });
        it('should return error if there are more numbers than operators + 1', function () {
            expect(evaluateRPN('9 11 12 +')).to.be.an('Error: operator missing');
        });
    });
});
