var mockServer = require('node-mock-server');
mockServer({
    restPath: __dirname + '/rest',
    dirName: __dirname,
    title: 'ZMONs UI Mock Server',
    version: 1,
    urlBase: 'http://localhost:3003',
    urlPath: '/rest',
    port: 3003,
    funcPath: __dirname + '/func'
});
