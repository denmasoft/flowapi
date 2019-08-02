var SocketCluster = require('socketcluster');
var socketCluster = new SocketCluster({
    workers: 3,
    brokers: 3,
    port: 3000,
    appName: "flowapi",
    workerController: __dirname + '/worker.js',
    brokerController: __dirname + '/broker.js',
    socketChannelLimit: 1000,
    rebootWorkerOnCrash: true
});