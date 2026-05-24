import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import HeaderIcon from '@/components/common/HeaderIcon';
import useGetCacheData from '@/hooks/useGetCacheData';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

const HeaderIcons = () => {
  const { userId } = useCachedUserInfo();
  const { userId: profileID } = useParams();
  const { pathname } = useLocation();
  const { productName } = useParams();

  const stats = pathname === '/coffee';
  const brand = pathname.startsWith('/brand');
  const productDetail = brand && productName;

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

  const iconsgenerator = () => {
    if (stats) return ['', notification];
    if (brand) return productDetail ? ['share', 'home'] : ['', 'home'];
    if (userId === profileID) return ['share', notification];
    else return ['search', notification];
  };
  const icons = iconsgenerator();

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
