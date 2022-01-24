import { CacheFirst, CacheOnly } from "workbox-strategies";
import { clientsClaim } from "workbox-core";
import { createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { ExpirationPlugin } from "workbox-expiration";
import { registerRoute } from "workbox-routing";
/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

declare const self: ServiceWorkerGlobalScope;

const assetsCache = "assets-cache";
const folderWithProblemPagesImages = "assets";

clientsClaim();

// Precaching app shell
precacheAndRoute(self.__WB_MANIFEST);

// Assets cache
registerRoute(
  ({ url }) =>
    url.origin === self.location.origin &&
    url.pathname.includes(`${folderWithProblemPagesImages}/`),

  new CacheFirst({
    cacheName: assetsCache,
  })
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
