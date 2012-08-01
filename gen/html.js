
var args      = process.argv.splice(2),
    myname    = require('path').basename(process.argv[1]),
    output    = false,
    fs        = require('fs'),
    colorbrew = require('../colorbrew'),
    html      = '';

if (args.length) {
    ['-h', '--help', 'help'].forEach(function(v) {
        if (args.indexOf(v) !== -1) {
            console.log('usage: node ' + myname + ' [-o|-h]');
            console.log("\ngenerates an HTML file that displays the color sets per scheme defined in colorbrew.css, the contents are written to the file ../colors.html unless the -o parameter is given, in which the content is output.\n");
            process.exit(1);
        }
    });

    ['-o', '--output'].forEach(function(v) {
        if (args.indexOf(v) !== -1)
            output = true;
    });
}

html += '<html>'
      + '<head>'
      + '<link href="./colorbrew.css" rel="stylesheet">'
      + '</head>'
      + '<style type="text/css">'
      + '   .scheme    { }'
      + '   .set       { height: 17px; }'
      + '   .setnum    { font-size: 12px; font-family: sans; text-align: right; vertical-align: text-bottom; line-height: 12px; padding-right: 4px; }'
      + '   .setnum,'
      + '   .sample    { display: inline-block; width: 16px; height: 16px; margin: 0px 1px 0px 0px; }'
      + '</style>'
      + '<body>'
      ;

for (var k in colorbrew) if (typeof colorbrew[k] !== 'function' && colorbrew[k].category) {
    html += '<div class="scheme"><h2>' + k + '</h2>';

    for (var i in colorbrew[k]) if (i + 0 > 0) {

        html += '<div class="set ' + k + '"><div class="setnum">' + i + '</div>';

        for (var j = 0, l = colorbrew[k][i].length; j < l; j += 1)
            html += '<div class="sample q' + j + '-' + i + '"></div>';

        html += '</div>';
    }

    html += '</div>';
}

html += '</body></html>';

if (output)
    console.log(html);
else
    fs.writeFileSync(__dirname + '/../colors.html', html, 'utf-8');