var SCWorker = require('socketcluster/scworker')
var fs = require('fs');
var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
class Worker extends SCWorker {
    run() {
        console.log('   >> Worker PID:', process.pid);
        var rauth = require('./routes/webflow/auth');
        var rsites = require('./routes/webflow/sites');
        var rcollections = require('./routes/webflow/collections');
        var rwebhooks = require('./routes/webflow/webhooks');
        var app = require('express')();
        var httpServer = this.httpServer;
        var scServer = this.scServer;
        app.use(serveStatic(path.resolve(__dirname, 'public')));
        app.use(cors());
        app.use(bodyParser.json({ limit: '50mb' }));
        app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
        app.use(cookieParser());
        app.use('/api/webflow/v1/auth', rauth);
        app.use('/api/webflow/v1/sites', rsites);
        app.use('/api/webflow/v1/collections', rcollections);
        app.use('/api/webflow/v1/webhooks', rwebhooks);
        httpServer.on('request', app);
        var count = 0;
        scServer.on('connection', function(socket) {
            socket.on('sampleClientEvent', function(data) {
                count++;
                console.log('Handled sampleClientEvent', data);
                scServer.exchange.publish('sample', count);
            });
            var interval = setInterval(function() {
                socket.emit('rand', {
                    rand: Math.floor(Math.random() * 5)
                });
            }, 1000);
            socket.on('disconnect', function() {
                clearInterval(interval);
            });
        });
    }
}
new Worker();