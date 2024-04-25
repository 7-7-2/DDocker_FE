export const useDeleteCacheData = async (
  cacheName: string,
  url: string | Array<string>
) => {
  const cacheStorage = await caches.open(cacheName);
  typeof url === 'string'
    ? await cacheStorage.delete(url)
    : url.map(async item => await cacheStorage.delete(item));
};
