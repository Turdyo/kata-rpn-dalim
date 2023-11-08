const expect = require('chai').expect;
const itParam = require('mocha-param');

const { evaluateRPN } = require('../main/rpn');

describe('RPN', function () {
    describe('normal cases for evaluateRPN function', function () {
        var testCasesPlus = [
            { input: '9 11 +', expected: '20' },
            { input: '9 11 12 + +', expected: '32' }
        ];

        var testCasesMinus = [
            { input: '9 11 -', expected: '-2' },
            { input: '9 11 12 - -', expected: '10' }
        ];

        var testCasesMultiply = [
            { input: '9 11 *', expected: '99' },
            { input: '9 11 12 * *', expected: '1188' }
        ];

        var testCasesDivide = [
            { input: '99 9 /', expected: '11' },
            { input: '120 2 6 / /', expected: '10' },
            { input: '9 2 /', expected: '4' }, // Assuming the evaluateRPN function floors the result
            { input: '9 0 /', expected: new Error('division by zero') }
        ];

        var testCasesCombinations = [
            { input: '4 6 * 2 /', expected: '12' },
            { input: '1 2 * 3 + 4 - 5 +', expected: '6' },
            { input: '4 2 3 + -', expected: '-1' }
        ];

        var allTestCases = testCasesPlus.concat(testCasesMinus, testCasesMultiply, testCasesDivide, testCasesCombinations);

        itParam("it should work", allTestCases, function (testCase) {
            var actual = evaluateRPN(testCase.input);
            if (testCase.expected instanceof Error) {
                expect(actual).to.be.an('Error');
                expect(actual.message).to.equal(testCase.expected.message);
            } else {
                expect(actual).to.equal(testCase.expected);
            }
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
        it('should return error if + is missing one argument', function () {
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
