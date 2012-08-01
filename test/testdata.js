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
        outofbounds         : [1,2,13,14,15,16/*....*/],
        // num of random colors to be selected for each test
        cnum                : 5,
        // 5-color return values for specific values returned by Math.random
        random_returns      : [
            // if Math.random()     then colorbrewer.random(5)
            // returns this:        must return this:
            [0.0,                   ['rgb(255,255,204)', 'rgb(194,230,153)', 'rgb(120,198,121)', 'rgb(49,163,84)',   'rgb(0,104,55)']],
            [0.5,                   ['rgb(247,247,247)', 'rgb(204,204,204)', 'rgb(150,150,150)', 'rgb(99,99,99)',    'rgb(37,37,37)']],
            [0.7,                   ['rgb(202,0,32)',    'rgb(244,165,130)', 'rgb(255,255,255)', 'rgb(186,186,186)', 'rgb(64,64,64)']],
            [1.0,                   ['rgb(141,211,199)', 'rgb(255,255,179)', 'rgb(190,186,218)', 'rgb(251,128,114)', 'rgb(128,177,211)']]
        ],

        invalid_cat         : {
            name            : 'iaminvalid',
            errmsg_re       : /^Invalid color scheme category given, valid values are: [a-z]+(\,[a-z]+)*$/
        },

        cat_set_names       : {
            'sequential'    : ['YlGn','YlGnBu','GnBu','BuGn','PuBuGn','PuBu','BuPu','RdPu','PuRd','OrRd','YlOrRd','YlOrBr','Purples','Blues','Greens','Oranges','Reds','Greys'],
            'diverging'     : ['PuOr','BrBG','PRGn','PiYG','RdBu','RdGy','RdYlBu','Spectral','RdYlGn'],
            'qualitative'   : ['Accent','Dark2','Paired','Pastel1','Pastel2','Set1','Set2','Set3']
        },

        cat_rand_returns    : {
            'sequential'    : [
                [0.0, ['rgb(255,255,204)', 'rgb(194,230,153)', 'rgb(120,198,121)', 'rgb(49,163,84)',  'rgb(0,104,55)']],
                [0.5, ['rgb(247,247,247)', 'rgb(204,204,204)', 'rgb(150,150,150)', 'rgb(99,99,99)',   'rgb(37,37,37)']],
                [1.0, ['rgb(141,211,199)', 'rgb(255,255,179)', 'rgb(190,186,218)', 'rgb(251,128,114)','rgb(128,177,211)']]
            ],
            'diverging'     : [
                [0.0, ['rgb(255,255,204)', 'rgb(194,230,153)', 'rgb(120,198,121)', 'rgb(49,163,84)',  'rgb(0,104,55)']],
                [0.5, ['rgb(247,247,247)', 'rgb(204,204,204)', 'rgb(150,150,150)', 'rgb(99,99,99)',   'rgb(37,37,37)']],
                [1.0, ['rgb(141,211,199)', 'rgb(255,255,179)', 'rgb(190,186,218)', 'rgb(251,128,114)','rgb(128,177,211)']]
            ],
            'qualitative'   : [
                [0.0, ['rgb(255,255,204)', 'rgb(194,230,153)', 'rgb(120,198,121)', 'rgb(49,163,84)',  'rgb(0,104,55)']],
                [0.5, ['rgb(247,247,247)', 'rgb(204,204,204)', 'rgb(150,150,150)', 'rgb(99,99,99)',   'rgb(37,37,37)']],
                [1.0, ['rgb(141,211,199)', 'rgb(255,255,179)', 'rgb(190,186,218)', 'rgb(251,128,114)','rgb(128,177,211)']]
            ]
        }
    };
});