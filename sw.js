/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/10/index.html","887b7d6c1322b4b4cac619d7da2ca051"],["/13/index.html","6b5da1cb137091a271881018e9e9b3ef"],["/14/index.html","9af3bbde6bdd49a0dc2c14c450bebcfc"],["/15/index.html","97595c172d64c7da2b4772923ae6d833"],["/16/index.html","e592629dac472edb96a8f4da743e98e1"],["/19/index.html","c14b5f556abae6a91c75e5f6aedb1d5c"],["/2/index.html","861a59197095a2913c18c441a4833f92"],["/20/index.html","d0e47b1f57773a03f1f7d4bbee4e685b"],["/21/index.html","d2655ba0b7705127e511bdf32cf830d3"],["/22/index.html","e79431231b53ad4574bdffd81ea75e79"],["/23/index.html","0e7601b559c919824cf426802bb73389"],["/24/index.html","cd74d7329a99f73c88affe7b39a5f879"],["/25/index.html","76a0bcafccc8231f6ddbd9b7c13b029e"],["/26/index.html","242c836af5ca28ebe3ea521daa59ebb0"],["/27/index.html","95e2ce146b7fd71ca9f9413cf8d2072f"],["/28/index.html","32b96c4fb2c2309f43bb15af0eb2f6ed"],["/29/index.html","819fbedaf80e1c3893c2f2bdf83a279d"],["/3/index.html","be1ddff48dc81a92fa04362d45cdc195"],["/30/index.html","64b1f40022171c984ab149be942fd04b"],["/31/index.html","fa5c19c631d470d3de68b0db82de8378"],["/34/index.html","7f676ac638b1a4a2d4174b5cac9fe044"],["/37/index.html","35f7675160c2c0bf8d36e78a1600d284"],["/39/index.html","b8118e37ea8a30b713785e9731c28da2"],["/4/index.html","a5ea080f35cbc4b606148a80c03c9166"],["/404.html","00b094f46fcfa0650fa5eaac97f27756"],["/42/index.html","fb8cf50df3c05cba6a98af2ad37ecdf1"],["/45/index.html","8e5f21df891ac92121e1e60874309638"],["/49/index.html","52b58b854782a57f45e2e317eb2fe0d2"],["/5/index.html","244074af393f33fefd36d9559b95ce6f"],["/7/index.html","fde4fcc1cac62c9d42633a66d79ad666"],["/8/index.html","ef96456511789b63cff47d350931d100"],["/K_A_011/index.html","1a2341037fd80b0c161dec2b91fc6b48"],["/K_A_012/index.html","39ccfcbff6e1364130eb89065a320ff7"],["/K_A_014/index.html","99e4a69ca0c31c07291d60de762a6dfe"],["/K_A_016/index.html","d4b7634f0ef6cc5e640521aeae63d72e"],["/K_A_018/index.html","2d6c1d18c3f8c1a609ee1c0f492c4eb5"],["/K_A_020/index.html","8a010520e71c87bfae6e8393e04eeb24"],["/K_A_021/index.html","6bf392aef82ec1668e12e267ace53708"],["/K_A_022-1/index.html","c23a41cf07642b79b743a6979aee21db"],["/K_A_022-2/index.html","8b993ef1694fc6b72bbbfbf5ac5a562f"],["/K_F_001/index.html","ce76ed2d145d7bd1a02a441cb47b6ced"],["/K_F_002/index.html","57cdf67e37fc139f543341f7caccafef"],["/K_F_004/index.html","4c721f901f547a7f8a74538153434673"],["/K_F_005/index.html","5cc47249ca5c09233203ea16fe665da4"],["/K_F_007/index.html","3e6108de9e5af4c9b39eb34d6ac119a3"],["/K_F_008/index.html","7995b63c1da4d9c91df39b3cfab2dd2a"],["/K_F_010-1/index.html","fd498374eff5692206083ac0c9998110"],["/K_F_010-3/index.html","797f8052668631c21862b8385129dcac"],["/K_F_010-4/index.html","99adb59c33a359d492bb62875764b2eb"],["/K_F_010-5/index.html","0b0c6b146c8e89d3d087c45a3b141509"],["/K_F_010-6/index.html","dae0703b707adc8a21266970445e6336"],["/K_F_010-7/index.html","99854a332c8426ac1ea1c8abdb96b43c"],["/K_F_010-8/index.html","5a7ba62d9f9d60e8a772b2a81c2d35b2"],["/K_F_014-1/index.html","e7b07910d9ca41c31481e21a4202363a"],["/K_F_014-2/index.html","e75683f2f0c2c6849dc79b70a7809bbd"],["/K_F_014-3/index.html","ac3d2eda00204d8167a91950f1131d56"],["/K_F_014-5/index.html","988f13dbcd90066f1c3fd8bc97b224d4"],["/K_F_014-6/index.html","03a189069142a6df86458b552361f619"],["/K_F_017-1/index.html","81be5bbf833b02e49da5fac07731cdf0"],["/K_F_017-2/index.html","fa575d03c2db24b2fda56b5431d93f24"],["/K_F_017-3/index.html","ddedbfcb7c6a0a33fe4df25e17f08674"],["/K_F_017-4/index.html","90f230658942d545811be55bbcb6c825"],["/K_F_017-5/index.html","3a5fd6f9ed38d54645c417f3af61ec90"],["/K_F_017-7/index.html","ee78dbfca8695d9a119ea6f71f3e27fe"],["/K_F_024/index.html","f4ef1b8797878e6f57fb62c74b2daaf2"],["/K_F_025/index.html","445b76538bf27cae430000f05128f0b7"],["/K_F_026/index.html","80095973fee1ba613b49f755db556808"],["/K_F_027-2/index.html","cfb27e1a2fa83660af52a4876f379972"],["/K_F_027-3/index.html","163f836947c10e2df858fe2802177447"],["/K_F_027/index.html","81b0a061e429a3f391708c0b0a2ad3ba"],["/K_F_035/index.html","7bd56f53dc53b457fd1a23800e1e7b66"],["/K_F_036/index.html","0300c184af94a9a2915d45d59d3b6637"],["/K_F_037/index.html","71b2cb14fa96c4b76c3773f6f77fc036"],["/K_F_038/index.html","f431e14c6c2dd2677d9822bdfd858d8c"],["/K_P_001-3/index.html","e32fa75bb9bd65ffc8f5a4888ed2cb38"],["/K_P_001-4/index.html","38405a46b25fb33b7f3e8b7915fef0f9"],["/K_P_001-5/index.html","e0679974cb7c044d80fb31c0adb96b91"],["/K_P_001-6/index.html","6729fb999df727d3de5ca586816489f9"],["/K_P_002-1/index.html","4076405d76fd0b4fed315d29d74f7762"],["/K_P_002-4/index.html","b5e545bcf4c90c40954091d9e7cae14c"],["/K_P_002-5-1/index.html","222bf1772e995c8a17f1015d1bb7ba9b"],["/K_P_002-5-2/index.html","c1a5998b16a9da99d93f8f1cb74149e3"],["/K_P_002-5-3/index.html","3078a8901701703b80e45244b8e33239"],["/K_P_002-5-4/index.html","54e89cc7dfa140ce5b440125d8c819d0"],["/K_P_013-1/index.html","3d0a79e02b2ea454a9d774816b962cba"],["/about/index.html","0bec11fe25566dec5227a8b275bc3e23"],["/assets/css/main.css","de3b584ef44f9a3f342a17febade0b4e"],["/assets/img/favicon.jpg","ffb9f5c8afdda7fa4f3fd697e5147182"],["/assets/img/icons/android-chrome-192x192.png","d04640f917fc24fd8b5025366eaf1190"],["/assets/img/icons/android-chrome-256x256.png","30760d06a7acb1a324d0470fdf839e5d"],["/assets/img/icons/apple-touch-icon.png","14f683c254cd6288049d9a402b2544ac"],["/assets/img/icons/favicon-16x16.png","49b05665f4a3b3b44e8cc07482dff463"],["/assets/img/icons/favicon-32x32.png","49b05665f4a3b3b44e8cc07482dff463"],["/assets/img/icons/icon-github.svg","4e06335104a29f91e08d4ef420da7679"],["/assets/img/icons/icon-instagram.svg","1e1119e2628235ee4c8771bff15eb2ca"],["/assets/img/icons/icon-twitter.svg","30551913d5399d6520e8a74b6f1e23f0"],["/assets/img/icons/mstile-150x150.png","1cea2ceb806d1a018330a51a1d8b73b6"],["/assets/img/icons/safari-pinned-tab.svg","398ef6b25c0f7f3f6e54c112a8facc5f"],["/assets/img/posts/emile-perron-190221.jpg","4705474281b975b7a213b96e71f772e7"],["/assets/img/posts/emile-perron-190221_lg.jpg","aafe35b1dc6d9dc9293c8c2ef4121046"],["/assets/img/posts/emile-perron-190221_md.jpg","03ed35ed656429599daba312f0990a0f"],["/assets/img/posts/emile-perron-190221_placehold.jpg","67f40708f69ab671cee04d624258b85c"],["/assets/img/posts/emile-perron-190221_sm.jpg","4ce4178a62d5a456e90e7bc47bde50f5"],["/assets/img/posts/emile-perron-190221_thumb.jpg","f20085dfe2e36854f8a12f1fd6c50425"],["/assets/img/posts/emile-perron-190221_thumb@2x.jpg","b8fa22c3237de529316037f093b9cb4d"],["/assets/img/posts/emile-perron-190221_xs.jpg","ac32cbd525d72e932499668af5647d03"],["/assets/img/posts/hero.jpg","d7b49d543204c24742df6157878ca46f"],["/assets/img/posts/house.png","fb6a18c923f8a442a567de85fec738a8"],["/assets/img/posts/house_lg.png","fb6a18c923f8a442a567de85fec738a8"],["/assets/img/posts/house_md.png","62d9cd980dfdbad3f72f2f00cd7c0d0a"],["/assets/img/posts/house_placehold.png","3c4cb9c8c46e51091157a055de91c298"],["/assets/img/posts/house_sm.png","da786b477f14397e8d9a71c5afe876ee"],["/assets/img/posts/house_thumb.png","512fbbb64e72d3307f6586840207df97"],["/assets/img/posts/house_thumb@2x.png","6a144b76cf0d734256e547fbc5bf3ec2"],["/assets/img/posts/house_xs.png","b64e8a83f704bced718db4af4625280f"],["/assets/img/posts/shane-rounce-205187.jpg","bb774d6e05b2b55ffdabe11a8aac7c56"],["/assets/img/posts/shane-rounce-205187_lg.jpg","83cd838024fff9c3faec59fa1da97872"],["/assets/img/posts/shane-rounce-205187_md.jpg","628cf27bf658cf6de9df79ab9bf2cb2d"],["/assets/img/posts/shane-rounce-205187_placehold.jpg","249fc4a09bcfcbd7d5764f14c14ae82e"],["/assets/img/posts/shane-rounce-205187_sm.jpg","a2400a468e10d7d64528ac9c6bc3b6f0"],["/assets/img/posts/shane-rounce-205187_thumb.jpg","c3b2dd0d95a6d3a44d7702f8c06b1e78"],["/assets/img/posts/shane-rounce-205187_thumb@2x.jpg","b0722b63a92c92a44cd92c0201fc92a4"],["/assets/img/posts/shane-rounce-205187_xs.jpg","cd58fd23f3b3c1de2183beb9ed08327b"],["/assets/img/posts/sleek.jpg","a32252a618ffe8ae57c9ce9ab157a01b"],["/assets/img/posts/sleek_lg.jpg","004dd1f130b2a9d1fa72f05c0ae71bfd"],["/assets/img/posts/sleek_md.jpg","4e35ceb2f5fffd3d758fade699b0b85a"],["/assets/img/posts/sleek_placehold.jpg","0f48050cd7776895b98c6ce21597ff39"],["/assets/img/posts/sleek_sm.jpg","f30af3d30b7df905d962e494750f5da0"],["/assets/img/posts/sleek_thumb.jpg","f7b8a94ac9da8e5ea36bb9e459872400"],["/assets/img/posts/sleek_thumb@2x.jpg","e67e2129dc58a100b98a5e027c964dbc"],["/assets/img/posts/sleek_xs.jpg","c8212cace6d446950556a3bf6efe4520"],["/assets/js/bundle.js","f89138111490c02324bc9be2eace19f5"],["/categories/index.html","8e60573a7246cdfb1e87783f9ad5e6b5"],["/contact/index.html","b3a2ecc8842b87fb4ec548ea18d1cb79"],["/docs/index.html","998f787feb2f2f236586f66e66a4c6e4"],["/films/index.html","bf3807b7d0ca231d3644ec8ba667a51f"],["/gulpfile.babel.js","499ef2edde6e9b4fbafcb7c6f0cbc725"],["/index.html","edf51c203c025e813d23383194cfbf6b"],["/sw.js","721d611c7271ce64009ef7fe31e3748d"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







