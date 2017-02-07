#!/bin/bash

PROXY_PORT=9999 \
PROXY_TOKEN=$2 \
PROXY_URL=https://$1 \
PROXY_APP_PATH=../zmon-controller-ui-angular2/riotjs \
node proxy-with-jwt.js
