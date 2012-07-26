(function (scope, name, mod) {
    var hasDefine  = typeof define === 'function'  && typeof define.amd !== 'undefined',
        hasExports = typeof module !== 'undefined' && typeof module.exports !== 'undefined',
        hasExport  = typeof exports !== 'undefined';

    if (hasDefine)       { define(mod());          } // AMD Module
    else if (hasExports) { module.exports = mod(); } // Node.js Module
    else if (hasExport)  { exports[name]  = mod(); } // CommonJS Module
    else {

        var original = scope[name];

        mod.noConflict = function () {
            scope[name] = original;
            return mod();
        };

        scope[name] = mod();
    }

})(this, 'testdata', function() {
    return {
        // values that are out of bounds for colorbrewer.random()
        outofbounds         : [1,2,12,13,14,15,16/*....*/],
        // num of random colors to be selected for each test
        cnum                : 5,
        // 5-color return values for specific values returned by Math.random
        random_returns      : [
            // if Math.random()     then colorbrewer.random(5)
            // returns this:        must return this:
            [0.0,                   ['rgb(255,255,204)', 'rgb(194,230,153)', 'rgb(120,198,121)', 'rgb(49,163,84)',   'rgb(0,104,55)']],
            [0.5,                   ['rgb(239,243,255)', 'rgb(189,215,231)', 'rgb(107,174,214)', 'rgb(49,130,189)',  'rgb(8,81,156)']],
            [0.7,                   ['rgb(230,97,1)',    'rgb(253,184,99)',  'rgb(247,247,247)', 'rgb(178,171,210)', 'rgb(94,60,153)']],
            [1.0,                   ['rgb(215,25,28)',   'rgb(253,174,97)',  'rgb(255,255,191)', 'rgb(166,217,106)', 'rgb(26,150,65)']]
        ]
    };
});