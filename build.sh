#!/bin/bash
# author: chat@jat.email

baesite=${1:-127.0.0.1}
baesite=${baesite%/}
[ "${baesite:0:4}" != 'http' ] && baesite="http://$baesite"

rm -f extension.zip
sed -i "s^#baesite#^$baesite^" js/background.js
zip -r extension.zip css/ img/ js/ ./*.html manifest.json
sed -i "s^$baesite^#baesite#^" js/background.js
