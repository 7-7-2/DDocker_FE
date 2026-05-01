import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';

import { activeState, backToSearchState } from '@/atoms/atoms';
import { routeMap } from '@/utils/getRoute';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { useVerifyModalCTA } from '@/hooks/useVerifyModalCTA';
import { useResetRegistInfo } from '@/hooks/post/useResetRegistInfo';

export const useSmartBack = () => {
  //back
  const { userId } = useCachedUserInfo();
  const footerActiveState = useRecoilValue(activeState);
  const searchPage = useRecoilValue(backToSearchState);

  const { state } = useLocation();
  const favorites = state === 'favoriteEdit';

  const myPageBack = `/profile/${userId}`;
  const naveToBack = useNavigateTo('-1');

  const smartBack = searchPage
    ? naveToBack
    : useNavigateTo(
        favorites
          ? naveToBack
          : footerActiveState === 'my'
            ? myPageBack
            : routeMap.get(footerActiveState)
      );

  //close
  const { pathname } = useLocation();
  const registerPage = pathname.startsWith('/post/register');
  const { isModal, setIsModal } = useVerifyModalCTA();

  const registeredPage = pathname.endsWith('/caffeine');
  const { resetRegistInfo } = useResetRegistInfo();

  const updatePage = pathname.endsWith('/update');
  const updateClose = useNavigateTo(
    `${routeMap.get(footerActiveState)}${userId}`
  );

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
    return naveToBack();
  };

  return { smartBack, smartClose };
};
