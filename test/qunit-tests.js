/* global module, test, equal, ok, expect */
/* add cruft to spoof syntax highlighter in my editor :( */
if (false) {
    if (!module)        var module          = function() {};
    if (!test)          var test            = function() {};
    if (!equal)         var equal           = function() {};
    if (!ok)            var ok              = function() {};
    if (!expect)        var expect          = function() {};
    if (!notEqual)      var notEqual        = function() {};
    if (!strictEqual)   var strictEqual     = function() {};
    if (!notStrictEqual)var notStrictEqual  = function() {};
    if (!deepEqual)     var deepEqual       = function() {};
    if (!notDeepEqual)  var notDeepEqual    = function() {};
    if (!raises)        var raises          = function() {};
}

/* end of (syntax-highlighter) cruft */

var run_colorbrew_tests = function(cb, testdata, is_global) {

    // ------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------
    test('colorbrew Exists?', function() {
        expect(4);

        ok(typeof cb !== undefined,              'Module variable is defined');
        ok(typeof cb.constructor !== undefined,  'Module variable has constructor property');
        ok(cb.constructor === Object,            'Module variable constructor property is Object');
        ok(typeof cb.random === 'function',      'Module has `random` method');
    });

    test('colorbrew.random()', function() {
        expect(2 + testdata.outofbounds.length + testdata.random_returns.length);

        var colors = cb.random(testdata.cnum);

        ok(colors instanceof Array, 'An array of colors is returned');
        equal(colors.length, testdata.cnum, 'The array of colors contains ' + testdata.cnum + ' items');

        // out of bound values must return empty array
        testdata.outofbounds.forEach(function(i) {
            deepEqual(cb.random(i), [], 'Requesting ' + i + ' colors returns an empty array');
        });

        // Math.random spoof to ensure randomness works
        var rndFn = Math.random;

        testdata.random_returns.forEach(function(v) {
            Math.random = function() { return v[0]; };
            deepEqual(cb.random(testdata.cnum), v[1], 'Math.random return value of ' + v[0].toString() + ' returns the expected array of ' + testdata.cnum + ' colors.');
        });

        // reset
        Math.random = rndFn;
    });

    test('colorbrew.random() with category', function() {

        // Math.random spoof to ensure randomness works
        var rndFn = Math.random;

        for (var cat in testdata.cat_rand_returns)
            testdata.cat_rand_returns[cat].forEach(function(v) {
                Math.random = function() { return v[0]; };

                deepEqual(cb.random(testdata.cnum), v[1], 'Math.random return value of ' + v[0].toString() + ' returns the expected array of ' + testdata.cnum + ' colors.');
            });

        // reset
        Math.random = rndFn;
    });

    test('colorbrew.random() / colorbrew.getsets()  with invalid cat', function() {
        expect(2);
        raises(function() { cb.getsets(testdata.invalid_cat.name); }, testdata.invalid_cat.errmsg_re, 'passing an invalid category name to colorbrew.getsets() should raise an exception.');
        raises(function() { cb.random(testdata.cnum, testdata.invalid_cat.name); }, testdata.invalid_cat.errmsg_re, 'passing an invalid category name to colorbrew.random() should raise an exception.');
    });

    test('colorbrew.getcat() / colorbrew.getsets()', function() {
        for (var cat in testdata.cat_set_names) {
            var cats = cb.getsets(cat);

            deepEqual(testdata.cat_set_names[cat], cats, 'category "' + cat + '" contains the expected sets.');

            cats.forEach(function(v) {
                equal(cb.getcat(v), cat, 'set "' + v + '" has category "' + cat + '"');
            });
        }
    });

    if (!is_global)
        return;

    test('colorbrew.noConflict()', function() {
        expect(3);

        equal(cb, window.colorbrewer, 'colorbrewer is the global object prior to calling noConflict()');

        var local = cb.noConflict();

        equal(local, cb, 'colorbrewer.noConflict() returns the colorbrewer object');
        deepEqual(window.colorbrewer, {noconflicttest: true}, 'global colorbrewer object is set to the correct test object after calling noConflict()');
    });
};