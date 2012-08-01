var assert      = require('assert');
var colorbrew   = require('../colorbrew');
var testdata    = require('./testdata');

// module exists
(function(cb) {
    assert.ok(typeof cb !== undefined,              'Module variable is defined');
    assert.ok(typeof cb.constructor !== undefined,  'Module variable has constructor property');
    assert.ok(cb.constructor === Object,            'Module variable constructor property is Object');
    assert.ok(typeof cb.random === 'function',      'Module has `random` method');
}(colorbrew));

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

    for (var cat in testdata.cat_rand_returns)
        testdata.cat_rand_returns[cat].forEach(function(v) {
            Math.random = function() { return v[0]; };

            assert.deepEqual(cb.random(testdata.cnum), v[1], 'Math.random return value of ' + v[0].toString() + ' returns the expected array of ' + testdata.cnum + ' colors.');
        });

    // reset random func
    Math.random = rndFn;

}(colorbrew));

// invalid category names
(function(cb) {
    assert.throws(function() { cb.getsets(testdata.invalid_cat.name); }, testdata.invalid_cat.errmsg_re, 'passing an invalid category name to colorbrew.getsets() should raise an exception.');
    assert.throws(function() { cb.random(testdata.cnum, testdata.invalid_cat.name); }, testdata.invalid_cat.errmsg_re, 'passing an invalid category name to colorbrew.random() should raise an exception.');
}(colorbrew));


// colorbrew.getcat() / colorbrew.getsets()
(function(cb) {
   for (var cat in testdata.cat_set_names) {
        var cats = cb.getsets(cat);

        assert.deepEqual(testdata.cat_set_names[cat], cats, 'category "' + cat + '" contains the expected sets.');

        cats.forEach(function(v) {
            assert.equal(cb.getcat(v), cat, 'set "' + v + '" has category "' + cat + '"');
        });
    }
}(colorbrew));