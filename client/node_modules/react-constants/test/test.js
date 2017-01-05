/**
 * Simple tests for this simple module. (Make sure to run npm install before testing!)
 */

var should = require('chai').should();
var FluxConstantGenerator = require('../');

var expected_result_default = {CONSTANT_ONE: 'CONSTANT_ONE', CONSTANT_TWO: 'CONSTANT_TWO'};
var expected_result_compact = {CONSTANT_ONE: 0, CONSTANT_TWO: 1};



describe('Flux Constants Module', function() {
  context('Default Mode', function() {
    it('should return an object with mirrored keys and strings', function() {
      var TestConstants = FluxConstantGenerator(['CONSTANT_ONE', 'CONSTANT_TWO']);

      TestConstants.should.eql(expected_result_default);
    });
  });

  context('Compact Mode', function() {
    it('should return an object with contiguous integers as values for the strings passed in', function() {
      var TestConstants = FluxConstantGenerator(['CONSTANT_ONE', 'CONSTANT_TWO'], true);

      TestConstants.should.eql(expected_result_compact);
    });
  });
  
});