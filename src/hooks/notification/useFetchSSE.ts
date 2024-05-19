import { useEffect, useRef } from 'react';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';
import { useSetNotification } from '@/hooks/notification/useSetNotification';
import { useThrottle } from '@/hooks/notification/useThrottle';

const EventSource = EventSourcePolyfill;

export const useFetchSSE = () => {
  const { userId } = useCachedUserInfo();
  const { signedIn } = useGetSignedIn();
  const accessToken = signedIn && signedIn.cacheData;
  const { mutate: saveNotification } = useSetNotification();
  const notificationBuffer = useRef<Notification[]>([]);

  const flushBuffer = useThrottle(() => {
    if (notificationBuffer.current.length > 0) {
      saveNotification(notificationBuffer.current);
      notificationBuffer.current = [];
    }
  }, 1000);

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
      eventSource.addEventListener('message', e => {
        notificationBuffer.current.push(JSON.parse(e.data));
        flushBuffer();
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
