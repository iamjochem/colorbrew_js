var assert      = require('assert');
var colorbrewer = require('../colorbrewer');
var testdata    = require('./testdata');

// module exists
(function(cb) {
    assert.ok(typeof cb !== undefined,              'Module variable is defined');
    assert.ok(typeof cb.constructor !== undefined,  'Module variable has constructor property');
    assert.ok(cb.constructor === Object,            'Module variable constructor property is Object');
    assert.ok(typeof cb.random === 'function',      'Module has `random` method');
}(colorbrewer));

// random method
(function(cb) {
    var colors = cb.random(testdata.cnum);

    assert.ok(colors instanceof Array, 'An array of colors is returned');
    assert.equal(colors.length, testdata.cnum, 'The array of colors contains ' + testdata.cnum + ' items');

    // out of bound values must return empty array
    testdata.outofbounds.forEach(function(i) {
        assert.deepEqual(cb.random(i), [], 'Requesting ' + i + ' colors returns an empty array');
    });

    // Math.random spoof to ensure randomness works
    var rndFn = Math.random;

    testdata.random_returns.forEach(function(v) {
        Math.random = function() { return v[0]; };
        assert.deepEqual(cb.random(testdata.cnum), v[1], 'Math.random return value of ' + v[0].toString() + ' returns the expected array of ' + testdata.cnum + ' colors.');
    });

    // reset
    Math.random = rndFn;

}(colorbrewer));