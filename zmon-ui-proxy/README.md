Development Proxy for UI
========================

Install http-proxy:
-------------------

```
  npm install http-proxy --save
```


Run:
----

```
    PROXY_PORT=9999 \
    PROXY_TOKEN=<your cookie> \
    PROXY_URL=https://demo.zmon.io \
    PROXY_APP_PATH=../zmon-controller-ui-angular2/riotjs \
    node proxy-with-jwt.js
```

Usage:
------

Make your UI REST/API requests to "http://localhost:9999/rest/..."
