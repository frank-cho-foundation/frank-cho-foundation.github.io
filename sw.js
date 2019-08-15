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

var precacheConfig = [["/10/index.html","ff029385dbf322c5faab30a51119e919"],["/13/index.html","948138b3585f9281b10b449ca442a4af"],["/14/index.html","ea158619068e6cb035169740854d25a5"],["/15/index.html","73a88d16ec26f89bfbe49183afe99d68"],["/16/index.html","6068b73a7f64cdb0af314f81dcdb393f"],["/19/index.html","5e51ac1b37b06b4565458c634bfa87a5"],["/2/index.html","8d9664eb3c7ad029f7042742f22e3189"],["/20/index.html","d2525deb2340088b19de91a4da1677e7"],["/21/index.html","3ef9f6102d199e0be968dae781f71422"],["/22/index.html","40819b68903003b845bcf0e5e7afd320"],["/23/index.html","d934744a24fcc22191df25be81b8bd32"],["/24/index.html","a454c9cfa577eedda0518c1b75be3a17"],["/25/index.html","2755b526046a9cad258d63f6f6b1c708"],["/26/index.html","2e980d55aab78658b0dcfbd2f9947e30"],["/27/index.html","0314efaae3b530d774d5f1893d245c27"],["/28/index.html","c9a6a3e418af372634b0a63250cd674f"],["/29/index.html","a15ab4fdcb77d8945ac90c996116e640"],["/3/index.html","5070b6811cbf5b82b79a03a69d7e155c"],["/30/index.html","27127eef4a8d2da29da946a451dc6e85"],["/31/index.html","5094c02c6eeca26c0b7fd7ab6c521574"],["/34/index.html","6552b9395d03271aef6e902f0db7e9ed"],["/37/index.html","4fa870489a637e8d3148d046ce5fe2da"],["/39/index.html","08dc9f95e8734143d1f0cc501d095128"],["/4/index.html","54fc1a85d7c3b143f078a19b1d9d99b3"],["/404.html","d9101ca214394df042542f1f840f586e"],["/42/index.html","6d53b84df047c1c6f862d682159d9a84"],["/45/index.html","f9659cfac506f6bdb1a90f3a06581219"],["/49/index.html","0325eb187a0eb0aa9b00e772d4c94f97"],["/5/index.html","c5bef23b54c06e98ed9a74817b5d38e7"],["/7/index.html","cb03952ffdccfbaefc5708a48a7eaf9e"],["/8/index.html","e4c8b540a21481b641dfe2be49dddaad"],["/K_A_011/index.html","638ab071e27565ffa1adb4786bb3cf79"],["/K_A_012/index.html","070bcae2df8763d02eb00ac1f6c60b2e"],["/K_A_014/index.html","4761369f73d4a0920ef0e0490c11f232"],["/K_A_016/index.html","26828711647a5e4534c2bee7ffd1d7fb"],["/K_A_018/index.html","d5ad0f7a5ef5f8cfa220d287d7eeb83a"],["/K_A_020/index.html","ac2f1085c394483a259db73d7da92049"],["/K_A_021/index.html","a807ebf0d6fb2cbd98cf9fac8762737a"],["/K_A_022-1/index.html","fc80a24bd1abd0958cbcdfb662ea5c64"],["/K_A_022-2/index.html","ce3f2b98186a0b2a09b35dda756613c6"],["/K_F_001/index.html","e71c65bb410eb40363b6c160139cca56"],["/K_F_002/index.html","00074a56cbe3dbfbbd25b851393a30d4"],["/K_F_004/index.html","6e0a5bf75325077866bfa8ff50dab7eb"],["/K_F_005/index.html","d9338fb9460f016e94bd2cfe1300331b"],["/K_F_007/index.html","2f212d044ec3379430cf90fd5b2fc124"],["/K_F_008/index.html","7d52af013a6e7abe9364ad2930a373ea"],["/K_F_010-1/index.html","edc5067c7b02e3a4fb32fc9f395fdacb"],["/K_F_010-3/index.html","c050970a8df2f64d0e7857bf4b6c22a8"],["/K_F_010-4/index.html","e9bad70f81ce67cf521764843835b0af"],["/K_F_010-5/index.html","c5cc1ee28da1f7a403edacea36509823"],["/K_F_010-6/index.html","fe30081f8aee0b80f4d413bd276afcaf"],["/K_F_010-7/index.html","dd65f502aad8ebc762767377b5dce1a4"],["/K_F_010-8/index.html","16ac9342ac2a4dcefa626b18684fc186"],["/K_F_014-1/index.html","1ddbbbd5305ac5c5744366d5376ad9c7"],["/K_F_014-2/index.html","0c86f80097046f67ce9380edcbe13020"],["/K_F_014-3/index.html","1e90118231e10c7e1d1dd22279dd813d"],["/K_F_014-5/index.html","e45cb192bc1af09183996c81bbaed8b5"],["/K_F_014-6/index.html","9a9ae3792dca6d84eab48c79b9bf35d6"],["/K_F_017-1/index.html","1c1b78a9c5fc70a3d512a820c547a312"],["/K_F_017-2/index.html","e064e2f59d27807afc2b2ac5934656c8"],["/K_F_017-3/index.html","abec84ae48a9b677db10429133584d84"],["/K_F_017-4/index.html","31f03de986f40eada0e78c261c7df2f9"],["/K_F_017-5/index.html","96b05144923b2af75911dc50287e47be"],["/K_F_017-7/index.html","8990d3343d18fcd487382e513df07b24"],["/K_F_024/index.html","ead2dbba42e8745c9e661aac189646b2"],["/K_F_025/index.html","9ac048576003ef182ca098c34d100af6"],["/K_F_026/index.html","aa0287bcb739648a1b7c46d4d3886225"],["/K_F_027-2/index.html","a0ba713e42a90ef2f3b14f6ede32b39b"],["/K_F_027-3/index.html","965774245ba863d42fe254c8c2555f8a"],["/K_F_027/index.html","cdd81fb06d3985ebb50f2455c1850ce9"],["/K_F_035/index.html","ee4228e9de2a3346ab849c4f7bed4a57"],["/K_F_036/index.html","b78ec58a865c0886816cd2f0f7343f1d"],["/K_F_037/index.html","d51422db1d9b2861e19f5fffbfbba435"],["/K_F_038/index.html","2cbf10c05faa9190c3bb36168eec5f4a"],["/K_P_001-3/index.html","070c6f43afbc702920e2240180a9195b"],["/K_P_001-4/index.html","3dd9eac740362bed1aa16af349df94c3"],["/K_P_001-5/index.html","7e0982c91c01fcc69efd42bb4d21a917"],["/K_P_001-6/index.html","ea9ec30eb11cb9a39bd352ce5c9d0bbf"],["/K_P_002-1/index.html","a486d5ee5f8f09cd88b6b5d45af93d15"],["/K_P_002-4/index.html","12e81a443752368c67149a67f5fd46e6"],["/K_P_002-5-1/index.html","d3777b41c86bc39f810fb3219ec06954"],["/K_P_002-5-2/index.html","1f488d404e72052aa60e2c8613feb729"],["/K_P_002-5-3/index.html","2fbe3fe0c72449980a1ab66c88f75999"],["/K_P_002-5-4/index.html","f94c327732620b6a1fc7f14e3bd90cb1"],["/K_P_013-1/index.html","18c512282ca89393aba7bc555d781518"],["/about/index.html","9baca4d1ff0105caf8810c976f36da61"],["/assets/css/main.css","19b7aa5220d85e5d7bd4dff7a5e0d308"],["/assets/img/favicon.jpg","ffb9f5c8afdda7fa4f3fd697e5147182"],["/assets/img/icons/android-chrome-192x192.png","4df4c8779d47bcaa69516050281773b9"],["/assets/img/icons/android-chrome-256x256.png","939ec88a61f407945a27d867fca1651d"],["/assets/img/icons/apple-touch-icon.png","366666899d15cf8f6811cc73ee0d63de"],["/assets/img/icons/favicon-16x16.png","f625044491b20a5df78571ba266cbcf6"],["/assets/img/icons/favicon-32x32.png","67502381e45848a4ab76123364675ffe"],["/assets/img/icons/icon-github.svg","4e06335104a29f91e08d4ef420da7679"],["/assets/img/icons/icon-instagram.svg","1e1119e2628235ee4c8771bff15eb2ca"],["/assets/img/icons/icon-twitter.svg","30551913d5399d6520e8a74b6f1e23f0"],["/assets/img/icons/mstile-150x150.png","1cea2ceb806d1a018330a51a1d8b73b6"],["/assets/img/icons/safari-pinned-tab.svg","398ef6b25c0f7f3f6e54c112a8facc5f"],["/assets/img/posts/emile-perron-190221.jpg","4705474281b975b7a213b96e71f772e7"],["/assets/img/posts/emile-perron-190221_lg.jpg","aafe35b1dc6d9dc9293c8c2ef4121046"],["/assets/img/posts/emile-perron-190221_md.jpg","03ed35ed656429599daba312f0990a0f"],["/assets/img/posts/emile-perron-190221_placehold.jpg","67f40708f69ab671cee04d624258b85c"],["/assets/img/posts/emile-perron-190221_sm.jpg","4ce4178a62d5a456e90e7bc47bde50f5"],["/assets/img/posts/emile-perron-190221_thumb.jpg","f20085dfe2e36854f8a12f1fd6c50425"],["/assets/img/posts/emile-perron-190221_thumb@2x.jpg","b8fa22c3237de529316037f093b9cb4d"],["/assets/img/posts/emile-perron-190221_xs.jpg","ac32cbd525d72e932499668af5647d03"],["/assets/img/posts/shane-rounce-205187.jpg","bb774d6e05b2b55ffdabe11a8aac7c56"],["/assets/img/posts/shane-rounce-205187_lg.jpg","83cd838024fff9c3faec59fa1da97872"],["/assets/img/posts/shane-rounce-205187_md.jpg","628cf27bf658cf6de9df79ab9bf2cb2d"],["/assets/img/posts/shane-rounce-205187_placehold.jpg","249fc4a09bcfcbd7d5764f14c14ae82e"],["/assets/img/posts/shane-rounce-205187_sm.jpg","a2400a468e10d7d64528ac9c6bc3b6f0"],["/assets/img/posts/shane-rounce-205187_thumb.jpg","c3b2dd0d95a6d3a44d7702f8c06b1e78"],["/assets/img/posts/shane-rounce-205187_thumb@2x.jpg","b0722b63a92c92a44cd92c0201fc92a4"],["/assets/img/posts/shane-rounce-205187_xs.jpg","cd58fd23f3b3c1de2183beb9ed08327b"],["/assets/img/posts/sleek.jpg","a32252a618ffe8ae57c9ce9ab157a01b"],["/assets/img/posts/sleek_lg.jpg","95a1338aa524727f34950f269133e904"],["/assets/img/posts/sleek_md.jpg","4e35ceb2f5fffd3d758fade699b0b85a"],["/assets/img/posts/sleek_placehold.jpg","0f48050cd7776895b98c6ce21597ff39"],["/assets/img/posts/sleek_sm.jpg","f30af3d30b7df905d962e494750f5da0"],["/assets/img/posts/sleek_thumb.jpg","f7b8a94ac9da8e5ea36bb9e459872400"],["/assets/img/posts/sleek_thumb@2x.jpg","e67e2129dc58a100b98a5e027c964dbc"],["/assets/img/posts/sleek_xs.jpg","c8212cace6d446950556a3bf6efe4520"],["/assets/js/bundle.js","f89138111490c02324bc9be2eace19f5"],["/categories/index.html","38e128ee41514c32324e5a2aac43953d"],["/contact/index.html","5ed919d9c3066dd4f0e28a00655e4da2"],["/docs/index.html","6235926911cb242b8c3d3752cf4e4d73"],["/films/index.html","3340749292b4bf803c6ad92cef64a880"],["/gulpfile.babel.js","499ef2edde6e9b4fbafcb7c6f0cbc725"],["/index.html","4ab255302d7d0d324fb557bf1574bb50"],["/sw.js","217e4b77bda17c3c6d4353d83a88d5c9"],["/table/index.html","9fe7353f0f5e352a930650022293795a"]];
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







