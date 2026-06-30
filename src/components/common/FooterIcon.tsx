import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Icon from '@/components/common/Icon';
import FooterRegisterBtn from '@/components/common/FooterRegisterBtn';

import { registerBtnActiveState, activeState } from '@/atoms/atoms';
import useGetCacheData from '@/hooks/useGetCacheData';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { pathMap, routeMap } from '@/utils/getRoute';

import { cx } from 'styled-system/css';
import { Column, Center } from '@/styles/layout';
import { FooterTextMedium, FooterTextSelected } from '@/styles/styles';

const FooterIcon = ({ icon }: { icon: string }) => {
  const { pathname } = useLocation();
  const { userId: myId } = useCachedUserInfo();
  const path = pathname.split('/')[1];
  const [userId, setUserId] = useState('');
  const [active, setActive] = useRecoilState(activeState);
  const [activeRegisterBtn, setActiveRegisterBtn] = useRecoilState(
    registerBtnActiveState
  );

  const isProfile = path === 'profile';
  const isMyPage = pathname.split('/')[2] === myId;
  const register = icon === 'register';

  const navigateTo = useNavigateTo(routeMap.get(icon));

  const getUserId = async () => {
    const data = await useGetCacheData('user', '/userInfo');
    data ? setUserId(data.cacheData.data.userId) : setUserId('nonMember');
  };

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    if (myId && isProfile && !isMyPage) return setActive('feed');
    pathMap.get(path) && setActive(pathMap.get(path));
  }, [path]);

  routeMap.set('my', `/profile/${userId}`);

  const handleTouch = () => {
    setActive(icon);
    activeRegisterBtn && setActiveRegisterBtn(!activeRegisterBtn);
    navigateTo();
  };

  return (
    <>
      {!register ? (
        <div
          className={cx(Column, Center)}
          onClick={handleTouch}>
          <Icon
            {...iconPropsGenerator(active === icon ? `${icon}-active` : icon)}
          />
          <span
            className={active === icon ? FooterTextSelected : FooterTextMedium}>
            {icon.toUpperCase()}
          </span>
        </div>
      ) : (
        <FooterRegisterBtn icon={icon} />
      )}
    </>
  );
};

export default FooterIcon;
