ColorBrew.JS  [![Build Status](https://secure.travis-ci.org/iamjochem/colorbrew_js.png?branch=master)](http://travis-ci.org/iamjochem/colorbrew_js)
======================================

This is a derivative of [Cynthia Brewer's colorbrewer.js](http://pubgrenfell.princeton.edu/site_media/js/d3/lib/colorbrewer/), as found in the [d3.js project](http://d3js.org/)
This project contains a few simple extra's, namely:

+ addition of the 'qualitative' color schemes (as found in the original [colorbrewer tool](http://colorbrewer2.org/))
+ classification of color schemes according to category (i.e. 'sequential', 'diverging' or 'qualitative')
+ an extra 'fun' method for randomly selecting a series of colors from her defined sets based on a given number of colors and, optionally, a category.
+ a 'universal module loading wrapper' allowing for AMD, CommonJS and Node.js module loading in addition to the classic global object definition
+ a `noConflict` method, akin to [jQuery.noConflict()](http://api.jquery.com/jQuery.noConflict/) - this fall's squarely into 'because-i-can' category :)
+ some unit tests for the `random` method and the module loading wrapper

The color set definitions are identical to the original work, [a copy of the original license is included](https://github.com/iamjochem/colorbrewer_js/blob/master/COLORBREWER_LICENSE)

All hail to Cynthia Brewer for her aesthetic sensibility and painstaking work of compiling the color sets!

## Note

The files are named `colorbrew.js` and `colorbrew.css`, they are intended to be drop-in replacements for the `colorbrewer.js` and `colorbrewer.css` [files found in d3.js](https://github.com/mbostock/d3/tree/master/lib/colorbrewer), as such including the `colorbrew.js` in the classical manner (i.e. via **&lt;script&gt;** tag) will introduce a new global variable named `colorbrewer` (rather than `colorbrew`), this is done to support drop-in replacement.

## Usage

using the `random` method to retrieve a random array of beautiful colors:
```javascript
    // assumes the 'colorbrewer' var refers to an instance of this module
    var number_of_colors = 5;
    var colors           = colorbrewer.random(number_of_colors);

    console.log(colors);
```

which will output something akin to the following:
```
    ["rgb(247,247,247)", "rgb(204,204,204)", "rgb(150,150,150)", "rgb(99,99,99)", "rgb(37,37,37)"]
```

## Development

A couple of scripts are included in the `./gen` directory:

+ `gen/css.js` - generates a new copy of `../colorbrew.css` based on the definitions in `colorbrew.js`
+ `gen/html.js` - generates a 'git-ignored' html file `../colors.html` containing grids of the colors defined in `colorbrew.js`

## Testing

Testing requires [NodeJS](http://nodejs.org/), ([PhantomJS](http://phantomjs.org/) is also used for headless browser testing).

To test the node module variant, using Node's built asset module do this:
```
    > node ./test/run.nodejs.tests.js
```

To test commonjs/amd and global var variants using qunit.js, start a webserver:
```
    > node ./test/run.nodejs.server.js
```
then open the relevant page(s) in your browser ...

- http://localhost:3000/test/qunit-global.html
- http://localhost:3000/test/qunit-requirejs.html