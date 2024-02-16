import { DocumentData } from 'firebase/firestore';

const useSetCacheData = async (
  cacheName: string,
  url: string,
  cacheData: string | boolean | DocumentData
) => {
  const cacheStorage = await caches.open(cacheName);
  try {
    // response data 생성
    const data = { cacheData };
    const responseData = new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });

    // cache 스토리지에 data 등록
    await cacheStorage.put(url, responseData);
  } catch (err) {
    console.log(err);
  }
};

export default useSetCacheData;
