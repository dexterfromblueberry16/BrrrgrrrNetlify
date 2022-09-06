'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "ad988519e45ec784b0813c473b8ceee3",
"assets/assets/images/big-chicken-cheese-burger-transparent-background_670625-142.png": "2159e0e3694d09680c0376258af1e777",
"assets/assets/images/BlackBurger.jpeg": "f81218bd1a995b40e205f9dd5a0dc0d8",
"assets/assets/images/brrgrr.jfif": "e50c3e1fe4d13986a6a6f35d6d033845",
"assets/assets/images/CheeseBurger.jpg": "79f335600e6f4dff47974e304e18708d",
"assets/assets/images/ChickenBurger.jpg": "1e6111500cd871763570838d85122b86",
"assets/assets/images/Classic-Burger.jpg": "7e851cd6541cfd9e4ebc87ecc9df1416",
"assets/assets/images/CustomBurger.jpeg": "d6a18b54156c11bcf39736a4166e8be3",
"assets/assets/images/DoubleCheeseBurger.jpg": "e451adee6a2beac1b23662b2fe004f36",
"assets/assets/images/EggBurger.jpg": "3f3c03123e5a4285482488c4d5221d34",
"assets/assets/images/FishBurger.jpeg": "c336362bf432090f8b8139d3720f01bd",
"assets/assets/images/GrilledBurger.jpeg": "d187e11c001cc26aed26e396a15e7571",
"assets/assets/images/HealthyBurger.jpg": "17120a14ef5cb06d0460fc5bb2777109",
"assets/assets/images/IceCreamBurger.jpg": "64f3b70f114ec8e69e402eea4640ac54",
"assets/assets/images/KoreanBurger.jpg": "7e5e3f310e1be1c68d86d09c2a83ee09",
"assets/assets/images/LambBurger.jpeg": "1f4284e590c396c7716afc60194d0fdd",
"assets/assets/images/PizzaBurger.jpg": "9b8b50d4af340f2f1eacfbe7d5748d60",
"assets/assets/images/png-transparent-burger.png": "42505b8b5fa3f89a1f8ff08ffd0b2a67",
"assets/assets/images/png-transparent-hamburger-veggie-burger-take-out-fast-food-kebab-delicious-beef-burger-burger-with-lettuce-tomato-and-cheese-food-beef-recipe.png": "85b9b7648c789c3e14a9e5ec7e818edc",
"assets/assets/images/sandwich-hamburger-transparent-background_670625-13.png": "febd845e214f73db23b4ec4f2ac9b258",
"assets/assets/images/TacoBurger.jpg": "84b9aa7a7dc3bfbfbccbda1f352be52a",
"assets/assets/images/TeriyakiBurger.jpeg": "83b8b4228a42085e9d518ab8830748a6",
"assets/assets/images/TurkeyBurger.jpg": "d600b0d593e10552dc34642d7dc7f349",
"assets/assets/images/TwisperBurger.jpg": "f032c51e02846c33057139856be3cf8d",
"assets/assets/images/VegBurger.jpg": "f04f4f27842671111c5587d40fa1b10a",
"assets/assets/images/wallpaper.jfif": "be9ccf0b144613161ea90ed02eaf5ea2",
"assets/assets/images/ZingerBurger.jpg": "e3c9822c4b337438d60bb410b3755161",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "74c377a294a3521d5b1f9d0e54d5ee91",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "eb2682e33f25cd8f1fc59011497c35f8",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "6afa2275dda0da6d9e51353436ab5541",
"/": "6afa2275dda0da6d9e51353436ab5541",
"main.dart.js": "1bc238b700af65931b8a942bfc24f252",
"manifest.json": "4137147246a11ba2148318bc696c4202",
"version.json": "7cd6a41407e3ce7ca7e1a9f156efa75f"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
