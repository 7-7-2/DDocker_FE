import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';

import Icon from '@/components/common/Icon';
import { activeState } from '@/atoms/atoms';
import useGetCacheData from '@/hooks/useGetCacheData';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { Column, Center } from '@/styles/layout';
import { FooterTextMedium, FooterTextSelected } from '@/styles/styles';
import { cx } from 'styled-system/css';

const FooterIcon = ({ icon }: { icon: string }) => {
  const [userId, setUserId] = useState();
  const [active, setActive] = useRecoilState(activeState);

  const getUserId = async () => {
    const data = await useGetCacheData('user', '/userInfo');
    data && setUserId(data.cacheData.data.userId);
  };

  useEffect(() => {
    getUserId();
  }, []);

  const routeMap = new Map();
  routeMap.set('home', '/');
  routeMap.set('feed', '/posts');
  routeMap.set('coffee', '/coffee');
  routeMap.set('my', `/profile/${userId}`);

  const navigateTo = useNavigateTo(routeMap.get(icon));

  const handleTouch = () => {
    setActive(icon);
    navigateTo();
  };

  return (
    <>
      {icon && (
        <div
          className={cx(Column, Center)}
          onTouchEnd={handleTouch}>
          <Icon
            {...iconPropsGenerator(active === icon ? `${icon}-active` : icon)}
          />
          <span
            className={active === icon ? FooterTextSelected : FooterTextMedium}>
            {icon.toUpperCase()}
          </span>
        </div>
      )}
    </>
  );
};

export default FooterIcon;
