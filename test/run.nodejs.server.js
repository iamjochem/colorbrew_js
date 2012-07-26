/*
 * Simple connect server for phantom.js
 * Adapted from Modernizr
 */

var args    = process.argv.splice(2)
  , log_pid = false
  , connect = require('connect')
  , http    = require('http')
  , fs      = require('fs')
  , myname  = require('path').basename(process.argv[1])
  , util    = require('util')
  , app     = connect().use(connect.static(__dirname + '/../'));

if (args.length) {
    ['-h', '--help', 'help'].forEach(function(v) {
        if (args.indexOf(v) !== -1) {
            console.log('usage: node ' + myname + ' [-h] logpid');
            console.log("\nstarts a webserver in the project root on port 3000, passing 'logpid' will cause the script to store it's process id in " + __dirname + "pid.txt (in the directory this script is stored in), 'logpid' is ignored if the help message is invoked.\n")
            process.exit(1);
        }
    })

    if (args.indexOf('log_pid') !== -1)
        log_pid = true;
}

http.createServer(app).listen(3000);

if (log_pid)
    fs.writeFileSync(__dirname + '/pid.txt', process.pid, 'utf-8');