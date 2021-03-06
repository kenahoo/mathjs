// test parse
var assert = require('assert'),
    error = require('../../../lib/error/index'),
    math = require('../../../index'),
    Node = require('../../../lib/expression/node/Node');

describe('parse', function() {

  it('should compile an expression', function() {
    var code = math.compile('(5+3)/4');
    assert.ok(code instanceof Object);
    assert.ok(code.eval instanceof Function);
    assert.equal(code.eval(), 2);
  });

  it('should parse multiple expressions', function() {
    var codes = math.compile(['2+3', '4+5']);
    assert.ok(Array.isArray(codes));
    assert.equal(codes.length, 2);

    assert.equal(codes[0].eval(), 5);
    assert.equal(codes[1].eval(), 9);
  });

  it('should throw an error on wrong number of arguments', function() {
    assert.throws(function () {math.compile()}, error.ArgumentsError);
    assert.throws(function () {math.compile('2+3', '3+4')}, error.ArgumentsError);
  });

  it('should throw an error on wrong type of argument', function() {
    assert.throws(function () {math.compile(2)}, TypeError);
    assert.throws(function () {math.compile(math.complex(2, 3))}, TypeError);
  });

  it('should LaTeX compile', function () {
    var expression = math.parse('compile(1)');
    assert.equal(expression.toTex(), '\\mathrm{compile}\\left(1\\right)');
  });

});
