import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';

import { activeState, backToSearchState } from '@/atoms/atoms';
import { routeMap } from '@/utils/getRoute';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { useVerifyModalCTA } from '@/hooks/useVerifyModalCTA';
import { useResetRegistInfo } from '@/hooks/post/useResetRegistInfo';

export const useSmartBack = () => {
  const { pathname } = useLocation();

  //back
  const { userId } = useCachedUserInfo();
  const footerActiveState = useRecoilValue(activeState);
  const searchPage = useRecoilValue(backToSearchState);

  const { state } = useLocation();
  const favorites = state === 'favoriteEdit';

  const myPageBack = useNavigateTo(`/profile/${userId}`);
  const navToBack = useNavigateTo('-1');
  const navToFooterState = useNavigateTo(routeMap.get(footerActiveState));

  const smartBack = () => {
    if (searchPage || favorites) {
      resetRegistInfo();
      return navToBack();
    }
    if (footerActiveState === 'my') {
      return myPageBack();
    } else {
      return navToFooterState();
    }
  };

  //close
  const registerPage = pathname.startsWith('/post/register');
  const { isModal, setIsModal } = useVerifyModalCTA();

  const registeredPage = pathname.endsWith('/caffeine');
  const { resetRegistInfo } = useResetRegistInfo();

  const updatePage = pathname.endsWith('/update');
  // const updateClose = useNavigateTo(
  //   `${routeMap.get(footerActiveState)}${userId}`
  // );

  const smartClose = () => {
    if (registerPage) {
      return setIsModal(!isModal);
    }
    if (updatePage) {
      resetRegistInfo();
      return smartBack();
    }
    if (registeredPage) {
      resetRegistInfo();
      return smartBack();
    }
    return navToBack();
  };

  return { smartBack, smartClose };
};
