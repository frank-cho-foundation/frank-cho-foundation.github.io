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

var precacheConfig = [["/10/index.html","ec113101ff50e1ef3a7801c4a9a9ab48"],["/13/index.html","5a6cc0780f88fcad96a7672c59a75ed3"],["/14/index.html","e3087d133a3bbf529cec2c3b9b93662f"],["/15/index.html","0d430b8b93cdba5249674456ea13fa9a"],["/16/index.html","5e447f5093b603329a1870a64a281c13"],["/19/index.html","7b2607af418491824364401eb10b4068"],["/2/index.html","1f2c0ac9dc2ba2f117f54c0cbe2669e3"],["/20/index.html","ffd532054d843812ca0ffcb09070863d"],["/21/index.html","236cd0770d9f5055778cb26622e956e4"],["/22/index.html","2f6d7da51a5ff8cfa8c3f3461bb21f26"],["/23/index.html","dfa7e1470fe8791fc5e22793bf0949d9"],["/24/index.html","111946ddf2e7e7e25e3e7970a2dab1f9"],["/25/index.html","fa16b988d095accca37d8d41b634862c"],["/26/index.html","e3987ad04c404cd697926db9c973f8cb"],["/27/index.html","e03be27a7af559f90e4f28d7dece9ba0"],["/28/index.html","cefe49e23c116e7ec6b60c0d89dfb5bb"],["/29/index.html","ff22a0ed67224a747669afe5627bd307"],["/3/index.html","068ee4fd556a8913cca034680219f9a6"],["/30/index.html","c27e89a032af2b983afa4bb41fb135ad"],["/31/index.html","34d7cac7f7c93ca7589dc5d56d070735"],["/34/index.html","3b02537c2eceb8783425c16a9044432a"],["/37/index.html","ff98f3ab7eb01c71ff8955227fcb6357"],["/39/index.html","9321315ad2f30ae54432c0202d85600e"],["/4/index.html","f5f39f1439455e5945eaa23e2a1c1950"],["/404.html","2ee5d9555df2cbad1f10a3c00e781188"],["/42/index.html","3098d545b46444ee9b7ea399b849af4b"],["/45/index.html","2b0703b2c29caf90b8cbe9f11effca02"],["/49/index.html","3d885b9a8158ff3548493c168d281b21"],["/5/index.html","c96cb70f910f9a306012f489cc67d641"],["/7/index.html","c4ea3168ec4badb49f5e7e69ee9995e9"],["/8/index.html","eb39fece89e0b46392d3fe2b848ec644"],["/K_A_011/index.html","8eefc6f9813743dddbf520020b7e046b"],["/K_A_012/index.html","d1104c9f402417e22090c994a6bb744c"],["/K_A_014/index.html","9d66c0ca65a1031d1485458fdf2d19ba"],["/K_A_016/index.html","4a93796e13f6832bfa045cc182f6c907"],["/K_A_018/index.html","23c6dd0459bfb4cfd44c4cf42bbd1458"],["/K_A_020/index.html","84f95b37e53f8759e88599e5588f1611"],["/K_A_021/index.html","3a3afc34baffc4479192b57bf0257279"],["/K_A_022-1/index.html","063dc6f7f3212261d952035535615a60"],["/K_A_022-2/index.html","1522e9e68c57143468ca7dd3a5119e61"],["/K_F_001/index.html","5ed19aa6abba8d907dae52aa5345a7bc"],["/K_F_002/index.html","b854165e9ff778b63e1883f2e38654d1"],["/K_F_004/index.html","28e9956b47a1858f75c1c8ff5f60ed17"],["/K_F_005/index.html","9b196845f5aff15941b143a2c83f3a0e"],["/K_F_007/index.html","579722005e2781dad0793b25407a02e6"],["/K_F_008/index.html","6247a0cfcc4e4efec2bfcb58242e01ba"],["/K_F_010-1/index.html","ae304e72f308ea2bc48712c324208012"],["/K_F_010-3/index.html","232e4d07038e6ddfa0519d53e2c37ed3"],["/K_F_010-4/index.html","ef8e596ee4b84ad6c1bdd854d7b545c5"],["/K_F_010-5/index.html","6ceab252f358910e3e19a08c28be8eda"],["/K_F_010-6/index.html","fcff9e4d6fa9fc1e641559c315a71831"],["/K_F_010-7/index.html","a45782c54236ae81a096070da9cfae68"],["/K_F_010-8/index.html","4806581563b184ad0ebd3f2396342dab"],["/K_F_014-1/index.html","7d57d6b9fe3b1b6099b00a584dc619cf"],["/K_F_014-2/index.html","f828abc182c5d11368337dce3d742978"],["/K_F_014-3/index.html","3d2f4358f2ebde7ac5998f83eeff18fa"],["/K_F_014-5/index.html","b9c8c98399f25ae679d66f509840a52d"],["/K_F_014-6/index.html","f7d0e0b4d8028e73785fe4888e8191d5"],["/K_F_017-1/index.html","e22820990ba686bfd9d83c91d6f101d5"],["/K_F_017-2/index.html","e9635d03b9c4e73da682f971cdc2cdee"],["/K_F_017-3/index.html","f3cae7ac55068206d8b17043cb589dd0"],["/K_F_017-4/index.html","4f7569e699c0164170e870859e694b43"],["/K_F_017-5/index.html","d45a307c3f8302513b0128dd8ef08cfa"],["/K_F_017-7/index.html","eea5a4ad928a1d21f9e0ab003ba4e3cd"],["/K_F_024/index.html","e10e439cf9bb64706682bbd858b3ee07"],["/K_F_025/index.html","d5dd3d9b5aca28827239be169d2e4ffe"],["/K_F_026/index.html","bc3aff8f0ea44ce374d7b12aec0731ee"],["/K_F_027-2/index.html","2811d2bac4f18f4b557a5f9185c0f46b"],["/K_F_027-3/index.html","d75a2f436e75897abfbb57f81a7de654"],["/K_F_027/index.html","92497949993776476dba683ee1004901"],["/K_F_035/index.html","dccf96d14eba4ee36e30b19ab790d0ff"],["/K_F_036/index.html","a4fae5dabfbf1e651bc1b8593496cf90"],["/K_F_037/index.html","cde1bbae8c57ca6be832928f7c564636"],["/K_F_038/index.html","adadb17a4a239d4a8a8f3e55395b40e9"],["/K_P_001-3/index.html","49a9b43e35684f22b0a490713d1c0090"],["/K_P_001-4/index.html","a07f37016d272579f36c69fcaa50d59c"],["/K_P_001-5/index.html","c54a58f0d5da82559bdbd19171d11f62"],["/K_P_001-6/index.html","d1eea74176fd0f807544d5b02a95b5a3"],["/K_P_002-1/index.html","281966f6174aa37fd41d67ec43f35626"],["/K_P_002-4/index.html","5513f535d9ffcaeadf1172af0ead1464"],["/K_P_002-5-1/index.html","0153dc15e993b2ae1ef0c4fefaea71a4"],["/K_P_002-5-2/index.html","3f10bf741d2a2105f42c2bec79e1d4e2"],["/K_P_002-5-3/index.html","a618a6dbad1b5c12d4c2843b09462266"],["/K_P_002-5-4/index.html","9a29ef7ef2ec5130e5e207825665f229"],["/K_P_013-1/index.html","e36dcb1d809012e386ccea1a700d2e72"],["/about/index.html","cf319bf0dbcd9837ed774317bdcf1a10"],["/assets/css/main.css","19b7aa5220d85e5d7bd4dff7a5e0d308"],["/assets/img/favicon.jpg","ffb9f5c8afdda7fa4f3fd697e5147182"],["/assets/img/icons/android-chrome-192x192.png","4df4c8779d47bcaa69516050281773b9"],["/assets/img/icons/android-chrome-256x256.png","939ec88a61f407945a27d867fca1651d"],["/assets/img/icons/apple-touch-icon.png","366666899d15cf8f6811cc73ee0d63de"],["/assets/img/icons/favicon-16x16.png","f625044491b20a5df78571ba266cbcf6"],["/assets/img/icons/favicon-32x32.png","67502381e45848a4ab76123364675ffe"],["/assets/img/icons/icon-github.svg","4e06335104a29f91e08d4ef420da7679"],["/assets/img/icons/icon-instagram.svg","1e1119e2628235ee4c8771bff15eb2ca"],["/assets/img/icons/icon-twitter.svg","30551913d5399d6520e8a74b6f1e23f0"],["/assets/img/icons/mstile-150x150.png","1cea2ceb806d1a018330a51a1d8b73b6"],["/assets/img/icons/safari-pinned-tab.svg","398ef6b25c0f7f3f6e54c112a8facc5f"],["/assets/img/posts/emile-perron-190221.jpg","4705474281b975b7a213b96e71f772e7"],["/assets/img/posts/emile-perron-190221_lg.jpg","aafe35b1dc6d9dc9293c8c2ef4121046"],["/assets/img/posts/emile-perron-190221_md.jpg","03ed35ed656429599daba312f0990a0f"],["/assets/img/posts/emile-perron-190221_placehold.jpg","67f40708f69ab671cee04d624258b85c"],["/assets/img/posts/emile-perron-190221_sm.jpg","4ce4178a62d5a456e90e7bc47bde50f5"],["/assets/img/posts/emile-perron-190221_thumb.jpg","f20085dfe2e36854f8a12f1fd6c50425"],["/assets/img/posts/emile-perron-190221_thumb@2x.jpg","b8fa22c3237de529316037f093b9cb4d"],["/assets/img/posts/emile-perron-190221_xs.jpg","ac32cbd525d72e932499668af5647d03"],["/assets/img/posts/shane-rounce-205187.jpg","bb774d6e05b2b55ffdabe11a8aac7c56"],["/assets/img/posts/shane-rounce-205187_lg.jpg","83cd838024fff9c3faec59fa1da97872"],["/assets/img/posts/shane-rounce-205187_md.jpg","628cf27bf658cf6de9df79ab9bf2cb2d"],["/assets/img/posts/shane-rounce-205187_placehold.jpg","249fc4a09bcfcbd7d5764f14c14ae82e"],["/assets/img/posts/shane-rounce-205187_sm.jpg","a2400a468e10d7d64528ac9c6bc3b6f0"],["/assets/img/posts/shane-rounce-205187_thumb.jpg","c3b2dd0d95a6d3a44d7702f8c06b1e78"],["/assets/img/posts/shane-rounce-205187_thumb@2x.jpg","b0722b63a92c92a44cd92c0201fc92a4"],["/assets/img/posts/shane-rounce-205187_xs.jpg","cd58fd23f3b3c1de2183beb9ed08327b"],["/assets/img/posts/sleek.jpg","a32252a618ffe8ae57c9ce9ab157a01b"],["/assets/img/posts/sleek_lg.jpg","95a1338aa524727f34950f269133e904"],["/assets/img/posts/sleek_md.jpg","4e35ceb2f5fffd3d758fade699b0b85a"],["/assets/img/posts/sleek_placehold.jpg","0f48050cd7776895b98c6ce21597ff39"],["/assets/img/posts/sleek_sm.jpg","f30af3d30b7df905d962e494750f5da0"],["/assets/img/posts/sleek_thumb.jpg","f7b8a94ac9da8e5ea36bb9e459872400"],["/assets/img/posts/sleek_thumb@2x.jpg","e67e2129dc58a100b98a5e027c964dbc"],["/assets/img/posts/sleek_xs.jpg","c8212cace6d446950556a3bf6efe4520"],["/assets/js/bundle.js","f89138111490c02324bc9be2eace19f5"],["/categories/index.html","9f0c6d47f61e549c9bb268cc338ffb83"],["/contact/index.html","66ef7c6ed54d216510ddcdc49f73ec90"],["/docs/index.html","5b9713fd0ab27fd60ff8a53fe454d50d"],["/films/index.html","03c48e09484979094508fdcaf9fcb9a0"],["/gulpfile.babel.js","499ef2edde6e9b4fbafcb7c6f0cbc725"],["/index.html","fdc111cac1e15e717e2376f7af55ec2e"],["/sw.js","806713a3a5c34796500e99ee9e6c1e93"],["/table/index.html","17b1dff230d344ba91679be7e38e086e"]];
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







