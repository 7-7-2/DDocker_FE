import React from 'react';
import HeaderIcon from '@/components/common/HeaderIcon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import useGetCacheData from '@/hooks/useGetCacheData';
import { useQuery } from '@tanstack/react-query';

const HeaderIcons = () => {
  const { data: unreadNotification } = useQuery({
    queryKey: ['unread'],
    queryFn: () => {
      return useGetCacheData('notification', '/unread');
    }
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
