var child = require('child_process');
var message = {
    status: true,
    msg: ''
}
var serverName = 'SEVPNCLIENT'; // declare server name of windows.

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

start(function(data) {
    console.log(data.status, data.msg);
});