const STATIC_CACHE_NAME = 'ddocker-static-v1';
const DYNAMIC_CACHE_NAME = 'ddocker-dynamic-v1';

const GET_OS_ASSETS = () => {
  const OS = navigator.userAgent.toLowerCase();
  const Android = OS.indexOf('android') > -1 && 'android';
  const iOS = OS.indexOf('iphone') > -1 && 'ios';
  const OS_ASSETS = iOS ? '/ios/*' : Android ? '/android/*' : null;
  return OS_ASSETS;
};

const ASSETS = [
  GET_OS_ASSETS(),
  '/index.html',
  '/sprite.svg',
  '/png/*',
  'https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Regular.woff2',
  'https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Medium.woff2',
  'https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-SemiBold.woff2',
  'https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Bold.woff2'
];

const CACHE = 'pwabuilder-page';

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

//1. SW  -  install (would last only small amout of time => apply waitUntil to make callback works properly)
const cacheAssets = async () => {
  const cache = await caches.open(STATIC_CACHE_NAME);
  await cache.addAll(ASSETS);
};

self.addEventListener('install', async event => {
  event.waitUntil(cacheAssets());
});

//2. SW - activate
const enableNavigationPreload = async () => {
  const STATIC_CACHE_ID = 'ddocker-static';

  if (self.registration.navigationPreload) {
    await self.registration.navigationPreload.enable();
  }

  const keys = await caches.keys();
  const deletePromises = keys
    .filter(key => key.startsWith(STATIC_CACHE_ID) && key !== STATIC_CACHE_NAME)
    .map(key => caches.delete(key));

  return await Promise.all(deletePromises);
};

self.addEventListener('activate', event => {
  event.waitUntil(enableNavigationPreload());
});

//3. SW - fetch(intercept fetch request and resue cache if exists)

const cacheOrFetch = async request => {
  const cachedResp = await caches.match(request);
  if (cachedResp) return cachedResp;

  const preloadResp = await request.preloadResponse;
  if (preloadResp) return preloadResp;

  const fetchRes = await fetch(request);
  if (
    (request.url === 'https://ddocker.kro.kr' ||
      request.url === 'https://www.ddocker.kro.kr') &&
    request.method === 'GET'
  ) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    await cache.put(request.url, fetchRes.clone());
  }

  return fetchRes;
};

const handleError = error => {
  console.error('Fetch failed:', error);
  return Promise.reject('Error: ', error);
};

self.addEventListener('fetch', event => {
  event.respondWith(cacheOrFetch(event.request).catch(handleError));
});
