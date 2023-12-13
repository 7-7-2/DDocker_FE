import { useNavigateTo } from '@/hooks/useNavigateTo';

export const useClose = () => {
  const location = window.location.href;
  const routeMap = {
    post: '/posts',
    register: '/home',
    // PROFILE => 유저 본인으로 이동할 수 있게 수정
    mypage: '/profile',
    default: '/'
  };
  const routesMap = Object.keys(routeMap);

  const handleTouch = () => {
    const targetRoute =
      routesMap.find(key => location.includes(key)) || routeMap['default'];

    useNavigateTo(targetRoute);
  };
  return { handleTouch };
};
