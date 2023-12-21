const useGetCacheData = async (cacheName: string, url: string) => {
  try {
    const cacheStorage = await caches.open(cacheName);
    const cachedResponse = await cacheStorage.match(url);

    if (cachedResponse) {
      const data = await cachedResponse.json();
      console.log('Cached Data:', data);
      return data;
    } else {
      console.log('Data not found in cache.');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving data from cache:', error);
    return null;
  }
};

export default useGetCacheData;
