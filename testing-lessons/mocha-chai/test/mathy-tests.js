// http://chaijs.com/api/assert/
var app = require('../app');

suite('mathy toolbox', function(){
  
  suite('#adder()', function(){
    test('should return the sum of the inputs', function(){
      assert.equal(app.adder(1,2), 3);
    });
  });

  suite('#squarer()', function () {
    test('should return the square of the input', function () {
      assert(app.squarer(2) === 4);
    });
  });

  suite('#cuber()', function () {
    test('should return the cube of the input', function () {
      assert.strictEqual(app.cuber(2), 8);
    });
  });

});