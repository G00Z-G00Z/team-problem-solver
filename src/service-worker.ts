import { clientsClaim } from 'workbox-core'
import { createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { ExpirationPlugin } from 'workbox-expiration'
import { registerRoute } from 'workbox-routing'
import {
  CacheFirst,
  CacheOnly,
  StaleWhileRevalidate,
} from "workbox-strategies";
/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

// Precaching
precacheAndRoute(self.__WB_MANIFEST);
precacheAndRoute([{ url: "/index.html" }, { url: "/favicon.ico" }]);

registerRoute(
  ({ request }) => {
    return request.destination === "style";
  },
  new CacheOnly({
    cacheName: "styles-cache",
  })
);

registerRoute(
  ({ request }) => {
    return request.url.endsWith(".js");
  },
  new CacheOnly({
    cacheName: "javascript-cache",
  })
);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
// const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
// registerRoute(
//   // Return false to exempt requests from being fulfilled by index.html.
//   ({ request, url }: { request: Request; url: URL }) => {
//     // If this isn't a navigation, skip.
//     if (request.mode !== "navigate") {
//       return false;
//     }

//     // If this is a URL that starts with /_, skip.
//     if (url.pathname.startsWith("/_")) {
//       return false;
//     }

//     // If this looks like a URL for a resource, because it contains
//     // a file extension, skip.
//     if (url.pathname.match(fileExtensionRegexp)) {
//       return false;
//     }

//     // Return true to signal that we want to use the handler.
//     return true;
//   },
//   createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html")
// );

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.
