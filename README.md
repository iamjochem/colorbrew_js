Color Brewer JS Module
======================================

This is a derivative of [Cynthia Brewer's colorbrewer.js](http://pubgrenfell.princeton.edu/site_media/js/d3/lib/colorbrewer/)
This project contains a few simple extra's, namely:

+ an extra 'fun' method for randomly selecting a series of colors from her defined sets based on a given
+ a 'universal module loading wrapper' allowing for AMD, CommonJS and Node.js module loading in addition to the classic global object definition
+ a `noConflict` method, akin to [jQuery.noConflict()](http://api.jquery.com/jQuery.noConflict/) - this fall's squarely into 'because-i-can' category :)
+ some unit tests for the `random` method and the module loading wrapper

The color set definitions are identical to the original work, [a copy of the original license is included](https://github.com/iamjochem/colorbrewer_js/blob/master/COLORBREWER_LICENSE)

All hail to Cynthia Brewer for her aesthetic sensibility and painstaking work of compiling the color sets!


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