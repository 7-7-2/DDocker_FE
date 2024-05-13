import NoticeItem from '@/components/notification/NoticeItem';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import useGetCacheData from '@/hooks/useGetCacheData';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';
import useSetCacheData from '@/hooks/useSetCacheData';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useEffect, useId } from 'react';
import { styled } from 'styled-system/jsx';

const SignInCTA = React.lazy(
  () => import('../components/posts/following/SignInCTA')
);

const Notification = () => {
  useComposeHeader(false, '알림', 'close');
  const { signedIn } = useGetSignedIn();

  const id = useId();
  const { data: cachedNotification } = useQuery({
    queryKey: ['cachedNotification'],
    queryFn: () => {
      return useGetCacheData('notification', '/user');
    }
  });

  useEffect(() => {
    useSetCacheData('notification', '/unread', false);
  }, []);

  return (
    <Container>
      {signedIn &&
        cachedNotification &&
        cachedNotification.cacheData.map((notification: any, idx: number) => (
          <NoticeItem
            key={id + idx}
            type={notification.type}
            senderId={notification.senderId}
            time={notification.time}
            nickname={notification.nickname}
            postId={notification.postId || ''}
          />
        ))}
      {!signedIn && <SignInCTA location="notice" />}
    </Container>
  );
};

const Container = styled.div`
  &:first-child {
    padding-top: 20px;
  }
`;

export default Notification;
