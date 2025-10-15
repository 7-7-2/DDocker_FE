import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Icon from '@/components/common/Icon';
import { activeState } from '@/atoms/atoms';
import useGetCacheData from '@/hooks/useGetCacheData';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { Column, Center, Flex } from '@/styles/layout';
import { FooterTextMedium, FooterTextSelected } from '@/styles/styles';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const pathMap = new Map();
pathMap.set('', 'home');
pathMap.set('posts', 'feed');
// pathMap.set('', 'register');
pathMap.set('coffee', 'stats');
pathMap.set('profile', 'my');

const routeMap = new Map();
routeMap.set('home', '/');
routeMap.set('feed', '/posts');
// routeMap.set('register', '/post/register');
routeMap.set('stats', '/coffee');

const FooterIcon = ({ icon }: { icon: string }) => {
  const { userId: myId } = useCachedUserInfo();
  const { pathname } = useLocation();
  const path = pathname.split('/')[1];
  const [userId, setUserId] = useState('');
  const [active, setActive] = useRecoilState(activeState);
  const isProfile = path === 'profile';
  const isMyPage = pathname.split('/')[2] === myId;

  const getUserId = async () => {
    const data = await useGetCacheData('user', '/userInfo');
    data ? setUserId(data.cacheData.data.userId) : setUserId('nonMember');
  };

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    if (isProfile && !isMyPage) return;
    pathMap.get(path) && setActive(pathMap.get(path));
  }, [path]);

  routeMap.set('my', `/profile/${userId}`);

  const navigateTo = useNavigateTo(routeMap.get(icon));

  const handleTouch = () => {
    setActive(icon);
    navigateTo();
  };

  const register = icon === 'register';

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
        <RegisterBtn className={cx(Flex, Center)}>
          <Icon {...iconPropsGenerator(icon, '16')} />
        </RegisterBtn>
      )}
    </>
  );
};

const RegisterBtn = styled.div`
  height: 42px;
  width: 42px;
  margin-top: -2px;
  background-color: var(--colors-main);
  border-radius: 50px;
`;

export default FooterIcon;
