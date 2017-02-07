var http = require('http'),
    url = require('url'),
    serveStatic = require('serve-static'),
    finalhandler = require('finalhandler'),
    httpProxy = require('http-proxy');

console.log("Use env vars to config: PROXY_URL, PROXY_TOKEN, PROXY_PORT")
console.log("PROXY_PORT: " + process.env.PROXY_PORT)
console.log("PROXY_URL: " + process.env.PROXY_URL)
console.log("PROXY_TOKEN: " + process.env.PROXY_TOKEN)

var port = process.env.PROXY_PORT
var proxy_url = process.env.PROXY_URL
var token = process.env.PROXY_TOKEN
var proxy_path = process.env.PROXY_APP_PATH

console.log("PROXY_PATH: " + proxy_path)

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

// To modify the proxy connection before data is sent, you can listen
// for the 'proxyReq' event. When the event is fired, you will receive
// the following arguments:
// (http.ClientRequest proxyReq, http.IncomingMessage req,
//  http.ServerResponse res, Object options). This mechanism is useful when
// you need to modify the proxy request before the proxy connection
// is made to the target.
//
proxy.on('proxyReq', function(proxyReq, req, res, options) {
  proxyReq.setHeader('Cookie', 'ZMON_JWT=' + token);
});

var staticFiles = serveStatic(proxy_path, {})

var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  pathName = url.parse(req.url).path;
  if (!pathName.startsWith('/rest')) {
      staticFiles(req, res, finalhandler(req, res))
  }
  else {
      proxy.web(req, res, {
        target: proxy_url,
        secure: false
      });
  }
});

console.log("listening on port " + port)
server.listen(port);
