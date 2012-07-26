Color Brewer
======================================

This is a derivative of [Cythia Brewer's colorbrewer.js](http://pubgrenfell.princeton.edu/site_media/js/d3/lib/colorbrewer/)
This project contains a few simple extra's, namely:

+ an extra 'fun' method for randomly selecting a series of colors from her defined sets based on a given
+ a 'universal module loading wrapper' allowing for AMD, CommonJS and Node.js module loading in addition to the classic global object definition
+ some unit tests for the `random` method and the module loading wrapper

The color set definitions are identical to the original work, [a copy of the original license is included](./COLORBREWER_LICENSE)

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