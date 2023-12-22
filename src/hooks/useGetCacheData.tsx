const useGetCacheData = async (cacheName: string, url: string) => {
  try {
    const cacheStorage = await caches.open(cacheName);
    const cachedResponse = await cacheStorage.match(url);

    if (cachedResponse) {
      const data = await cachedResponse.json();
      return data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export default useGetCacheData;
