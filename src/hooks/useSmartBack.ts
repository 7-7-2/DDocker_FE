import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';

import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { useVerifyModalCTA } from '@/hooks/useVerifyModalCTA';
import { useResetRegistInfo } from '@/hooks/post/useResetRegistInfo';

import { routeMap } from '@/utils/getRoute';
import { activeState, backToSearchState } from '@/atoms/atoms';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';

export const useSmartBack = () => {
  const { pathname } = useLocation();
  const { signedIn } = useGetSignedIn();
  //back
  const { userId } = useCachedUserInfo();
  const footerActiveState = useRecoilValue(activeState);

  const searchState = useRecoilValue(backToSearchState);
  const brandPage = pathname.endsWith('/brand');

  const { state } = useLocation();
  const favorites = state === 'favoriteEdit';

  const myPageBack = useNavigateTo(`/profile/${userId}`);
  const navToBack = useNavigateTo('-1');
  const navToHome = useNavigateTo(`/`);
  const navToFooterState = useNavigateTo(routeMap.get(footerActiveState));

  const smartBack = () => {
    if (searchState || favorites || brandPage) {
      brandPage && resetRegistInfo();
      return navToBack();
    }
    if (footerActiveState === 'my') {
      return signedIn ? myPageBack() : navToHome();
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
