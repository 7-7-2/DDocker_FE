const STATIC_CACHE_NAME = 'ddocker-static-v2';
const DYNAMIC_CACHE_NAME = 'ddocker-dynamic-v1';

const detectOS = () => {
  const OS = navigator.userAgent.toLowerCase();
  const Android = OS.indexOf('android') > -1 && 'android';
  const iOS = OS.indexOf('iphone') > -1 && 'ios';
  return Android ? Android : iOS ? iOS : null;
};

const GET_OS_ASSETS = os => {
  const iOS_ASSETS_SIZES = [
    100, 1024, 114, 120, 128, 144, 152, 16, 167, 180, 192, 20, 256, 20, 32, 40,
    50, 512, 57, 58, 60, 64, 72, 76, 80, 87
  ];
  const iOS_SIZE_ASSETS = iOS_ASSETS_SIZES.map(size => `/ios/${size}.png`);
  const iOS_maskable = [
    '/ios/manifest-icon-192.maskable.png',
    '/ios/manifest-icon-512.maskable.png'
  ];
  const iOS_ASSETS = [...iOS_SIZE_ASSETS, ...iOS_maskable];
  const Android_ASSETS_SIZES = [144, 192, 48, 512, 72, 96];
  const Android_ASSETS = Android_ASSETS_SIZES.map(
    size => `/android/android-launchericon-${size}-${size}.png`
  );
  return os === 'android' ? Android_ASSETS : os === 'ios' ? iOS_ASSETS : null;
};

const ASSETS = [
  '/index.html',
  '/ios/144.png',
  '/sprite.svg',
  '/png/angelinus.png',
  '/png/banapresso.png',
  '/png/bbak.png',
  '/png/coffee_mainimg.png',
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
  const curOS = detectOS();
  const OS_ASSETS = GET_OS_ASSETS(curOS);
  await cache.addAll(OS_ASSETS);
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
    (request.url === 'https://ddocker.o-r.kr' ||
      request.url === 'https://www.ddocker.o-r.kr') &&
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
