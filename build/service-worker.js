"use strict";var precacheConfig=[["/index.html","8cc46b97840e108df9dfd4e9c5698245"],["/static/css/main.e962dc63.css","8774dc368ad42998f5b23d03968edc4c"],["/static/js/main.759992dd.js","510605d29ba0754946cffe34aafc1183"],["/static/media/crowd3.aa9342a9.jpg","aa9342a90b51579b0174be8b2b1ef974"],["/static/media/dj15.257172c5.jpg","257172c58bcc4c701b56a9bc090636d9"],["/static/media/down_arrow.b5faf8d9.svg","b5faf8d9fb005498da23e472df96d8ac"],["/static/media/email_icon.da45685b.svg","da45685b18ff262b1bad352f49083f81"],["/static/media/facebook_icon.0e5020af.svg","0e5020afc2b288fb812d952dc735c7a2"],["/static/media/grit.d0dac35f.png","d0dac35fb310d81a60c46e201ddd0cdb"],["/static/media/hamburger_menu.47deaf00.svg","47deaf00198ed35487a6daee63295da9"],["/static/media/instagram_icon.74b7ec35.svg","74b7ec3565e7d60bf72ad5af93a2dd5c"],["/static/media/loft.d2b36980.jpg","d2b3698087059b64920c3c4d7151139d"],["/static/media/mira.e91c3f02.jpg","e91c3f02d24e64230b59ea96578e25b9"],["/static/media/outside.0713ec2d.jpg","0713ec2d874086f1ef7cfd99c7f76b9b"],["/static/media/pw_manhole_white.b8baf2c3.png","b8baf2c36f4881824fd8bf38748425f9"],["/static/media/twitter_icon.845d25ec.svg","845d25ecfe9ff63117638431bd4e61d1"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var r="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});