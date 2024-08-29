const STATIC_CACHE_NAME = 'ddocker-static-v2';
const DYNAMIC_CACHE_NAME = 'ddocker-dynamic-v2';

const ASSETS = [
  '/index.html',
  '/coffee/index.html',
  '/follow/index.html',
  '/mypage/index.html',
  '/notification/index.html',
  '/post/index.html',
  '/post/register/index.html',
  '/posts/index.html',
  '/profile/index.html',
  '/report/index.html',
  '/search/index.html',
  '/start/index.html',
  '/support/customerCenter/index.html',
  '/support/notice/index.html',
  '/support/privacyPolicy/index.html',
  '/support/TOS/index.html',
  '/png/feedpage.png',
  '/png/coffeepage.png',
  '/png/homepage.png',
  '/sprite.svg',
  '/png/angelinus.png',
  '/png/banapresso.png',
  '/png/bbak.png',
  '/png/coffee_mainimg.webp',
  '/png/coffeebean.png',
  '/png/compose.png',
  '/png/ediya.png',
  '/png/emptyCup.png',
  '/png/hasamdong.png',
  '/png/hollys.png',
  '/png/mammoth.png',
  '/png/megacoffee.png',
  '/png/pascucci.png',
  '/png/paulbassett.png',
  '/png/private.png',
  '/png/starbucks.png',
  '/png/theventi.png',
  '/png/waterCup.png',
  '/ios/100.png',
  '/ios/1024.png',
  '/ios/114.png',
  '/ios/120.png',
  '/ios/128.png',
  '/ios/144.png',
  '/ios/152.png',
  '/ios/16.png',
  '/ios/167.png',
  '/ios/180.png',
  '/ios/192.png',
  '/ios/256.png',
  '/ios/20.png',
  '/ios/32.png',
  '/ios/40.png',
  '/ios/50.png',
  '/ios/512.png',
  '/ios/57.png',
  '/ios/58.png',
  '/ios/60.png',
  '/ios/64.png',
  '/ios/72.png',
  '/ios/76.png',
  '/ios/80.png',
  '/ios/87.png',
  '/android/android-launchericon-144-144.png',
  '/android/android-launchericon-192-192.png',
  '/android/android-launchericon-48-48.png',
  '/android/android-launchericon-512-512.png',
  '/android/android-launchericon-72-72.png',
  '/android/android-launchericon-96-96.png',
  '/ios/manifest-icon-192.maskable.png',
  '/ios/manifest-icon-512.maskable.png',
  '/assets/apple-splash-640-1136.jpg',
  '/assets/apple-splash-750-1334.jpg',
  '/assets/apple-splash-828-1792.jpg',
  '/assets/apple-splash-1125-2436.jpg',
  '/assets/apple-splash-1136-640.jpg',
  '/assets/apple-splash-1170-2532.jpg',
  '/assets/apple-splash-1179-2556.jpg',
  '/assets/apple-splash-1242-2208.jpg',
  '/assets/apple-splash-1242-2688.jpg',
  '/assets/apple-splash-1284-2778.jpg',
  '/assets/apple-splash-1290-2796.jpg',
  '/assets/apple-splash-1334-750.jpg',
  '/assets/apple-splash-1536-2048.jpg',
  '/assets/apple-splash-1620-2160.jpg',
  '/assets/apple-splash-1668-2224.jpg',
  '/assets/apple-splash-1668-2388.jpg',
  '/assets/apple-splash-1792-828.jpg',
  '/assets/apple-splash-2048-1536.jpg',
  '/assets/apple-splash-2048-2732.jpg',
  '/assets/apple-splash-2160-1620.jpg',
  '/assets/apple-splash-2208-1242.jpg',
  '/assets/apple-splash-2224-1668.jpg',
  '/assets/apple-splash-2388-1668.jpg',
  '/assets/apple-splash-2436-1125.jpg',
  '/assets/apple-splash-2532-1170.jpg',
  '/assets/apple-splash-2556-1179.jpg',
  '/assets/apple-splash-2688-1242.jpg',
  '/assets/apple-splash-2732-2048.jpg',
  '/assets/apple-splash-2778-1284.jpg',
  '/assets/apple-splash-2796-1290.jpg',
  'https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Regular.woff2',
  'https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Medium.woff2',
  'https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-SemiBold.woff2',
  'https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Bold.woff2'
];

const CACHE = 'pwabuilder-page';

//1. SW  -  install (would last only small amout of time => apply waitUntil to make callback works properly)
const cacheAssets = async () => {
  const cache = await caches.open(STATIC_CACHE_NAME);
  await cache.addAll(ASSETS);
};

self.addEventListener('install', async event => {
  self.skipWaiting();
  event.waitUntil(cacheAssets());
});

//2. SW - activate
const enableNavigationPreload = async () => {
  self.clients.claim();

  const STATIC_CACHE_ID = 'ddocker-static';

  if (self.registration.navigationPreload) {
    await self.registration.navigationPreload.enable();
  }

  const keys = await caches.keys();
  const deletePromises = await keys
    .filter(key => key.startsWith(STATIC_CACHE_ID) && key !== STATIC_CACHE_NAME)
    .map(key => caches.delete(key));

  return await Promise.all(deletePromises);
};

self.addEventListener('activate', event => {
  event.waitUntil(enableNavigationPreload());
});

//3. SW - fetch(intercept fetch request and resue cache if exists)
const isCachableRequest = url => {
  const cachablePatterns = [
    new RegExp('^https://ddocker\\.kro\\.kr/.*'),
    new RegExp('^https://www\\.ddocker\\.kro\\.kr/.*')
  ];
  return cachablePatterns.some(pattern => pattern.test(url));
};

const cacheOrFetch = async request => {
  const cachedResp = await caches.match(request);
  if (cachedResp) return cachedResp;

  const preloadResp = await request.preloadResponse;
  if (preloadResp) return preloadResp;

  const fetchRes = await fetch(request);
  if (
    request.method === 'GET' &&
    fetchRes.status === 200 &&
    isCachableRequest(request.url)
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
  if (event.request.headers.get('Accept') === 'text/event-stream') return;
  event.respondWith(cacheOrFetch(event.request).catch(handleError));
});
