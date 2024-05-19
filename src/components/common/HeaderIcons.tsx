import React from 'react';
import HeaderIcon from '@/components/common/HeaderIcon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import useGetCacheData from '@/hooks/useGetCacheData';
import { useQuery } from '@tanstack/react-query';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';

const HeaderIcons = () => {
  const { userId } = useCachedUserInfo();
  const { data: unreadNotification } = useQuery({
    queryKey: ['unread', userId],
    queryFn: () => {
      return useGetCacheData('notification', `/unread-${userId}`);
    },
    enabled: !!userId
  });

  const notification =
    unreadNotification && unreadNotification.cacheData
      ? 'unread-notification'
      : 'notification';
  const icons = ['search', notification];

  return (
    <>
      {icons &&
        icons.map(item => (
          <React.Fragment key={item}>
            <HeaderIcon
              {...iconPropsGenerator(item)}
              icon={item}
            />
          </React.Fragment>
        ))}
    </>
  );
};

export default HeaderIcons;
