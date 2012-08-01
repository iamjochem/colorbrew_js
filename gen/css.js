
var args      = process.argv.splice(2),
    myname    = require('path').basename(process.argv[1]),
    output    = false,
    fs        = require('fs'),
    colorbrew = require('../colorbrew'),
    css       = '/*\n * This product includes color specifications and designs developed by Cynthia\n * Brewer (http://colorbrewer.org/).\n */\n\n';


if (args.length) {
    ['-h', '--help', 'help'].forEach(function(v) {
        if (args.indexOf(v) !== -1) {
            console.log('usage: node ' + myname + ' [-o|-h]');
            console.log("\ngenerates the contents of colorbrew.css based on the definitions in colorbrew.js, the contents are written to the file ../colorbrew.css unless the -o parameter is given, in which the content is output.\n");
            process.exit(1);
        }
    });

    ['-o', '--output'].forEach(function(v) {
        if (args.indexOf(v) !== -1)
            output = true;
    });
}

for (var k in colorbrew) if (typeof colorbrew[k] !== 'function' && colorbrew[k].category) {
    for (var i in colorbrew[k]) if (i + 0 > 0) {
        for (var j = 0, l = colorbrew[k][i].length; j < l; j += 1)
        css += '.' + k + ' .q' + j + '-' + i + ' { fill: ' + colorbrew[k][i][j] + '; background: ' + colorbrew[k][i][j] + '; }\n';
    }
}

if (output)
    console.log(css);
else
    fs.writeFileSync(__dirname + '/../colorbrew.css', css, 'utf-8');