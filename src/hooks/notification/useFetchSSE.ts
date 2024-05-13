import { useEffect } from 'react';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';
import { useSetNotification } from '@/hooks/notification/useSetNotification';

const EventSource = EventSourcePolyfill;

export const useFetchSSE = () => {
  const { userId } = useCachedUserInfo();
  const { signedIn } = useGetSignedIn();
  const accessToken = signedIn && signedIn.cacheData;
  const { mutate: saveNotification } = useSetNotification();

  useEffect(() => {
    if (userId && accessToken) {
      const eventSource = new EventSource(
        `${import.meta.env.VITE_BASE_URL}/notification/${userId}`,
        {
          headers: {
            Authorization: `${accessToken}`
          },
          heartbeatTimeout: 1200000
          // withCredentials: true
        }
      );
      eventSource.addEventListener('message', async e => {
        saveNotification(JSON.parse(e.data));
      });

      eventSource.onerror = () => {
        eventSource.close();
      };
      return () => {
        eventSource.close();
      };
    }
    return;
  }, [userId, accessToken]);
};
