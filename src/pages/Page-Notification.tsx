import CTA from '@/components/common/CTA';
import NoticeItem from '@/components/notification/NoticeItem';
import { CTA_TEXTS } from '@/constants/texts';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import useGetCacheData from '@/hooks/useGetCacheData';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';
import useSetCacheData from '@/hooks/useSetCacheData';
import { FlexCenter } from '@/styles/layout';
import { AlignCTA, NotificationContainer } from '@/styles/styles';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useEffect, useId } from 'react';
import { cx } from 'styled-system/css';
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
    <Container
      className={signedIn && !cachedNotification && NotificationContainer}>
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
      {signedIn && !cachedNotification && (
        <div className={cx(AlignCTA, FlexCenter)}>
          <CTA text={CTA_TEXTS.emptyNotification} />
        </div>
      )}
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
