import { useRef, useEffect, useCallback } from 'react';

type ThrottledFn<T extends any[]> = (...args: T) => void;

export const useThrottle = <T extends any[]>(
  callback: (...args: T) => void,
  delay: number
): ThrottledFn<T> => {
  const lastCall = useRef<number>(0);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const throttledFn: ThrottledFn<T> = useCallback(
    (...args: T) => {
      const now = Date.now();
      const timeSinceLastCall = now - lastCall.current;
      const invokeCallback = () => {
        callback(...args);
        lastCall.current = Date.now();
      };

      if (timeSinceLastCall >= delay) {
        invokeCallback();
      } else {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
        timeout.current = setTimeout(
          invokeCallback,
          delay - (now - lastCall.current)
        );
      }
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return throttledFn;
};
