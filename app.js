var server = require('http');
var child = require('child_process');
var message = {
    status: true,
    msg: ''
}
var serverName = 'SEVPNCLIENT'; // declare server name of windows and you can modify it

function start(callback) {
    child.execFile('start.bat', [serverName], function(error, stdout, stderr) { //start server SEVPNCLIENT
        if (!error) {
            child.execFile('check.bat', function(error, stdout, stderr) {
                if (stdout.indexOf('RUNNING') !== -1) { //Running
                    message.status = true;
                    message.msg = 'start success';

                } else {
                    message.status = false;
                    message.msg += ",please try it again";
                }
                //console.log(error, stdout, stderr);
                callback(message);
            });
        } else {
            message.status = false;
            message.msg += ",please try it again";
            callback(message);
        }
    });
}

server.createServer(function(req, res) {
    var url = req.url;
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    if (url == '/') {
        start(function(data) {
            console.log(data);
            var result = "start status: " + data.status + ", msg: " + data.msg
            res.end(result);
        });
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end('please visit: <a href=' + req.headers.host + ' >Start</a> to start server');
    }

}).listen(1000);