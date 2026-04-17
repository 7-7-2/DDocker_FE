import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';
import { routeMap } from '@/utils/getRoute';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { activeState } from '@/atoms/atoms';
export const useSmartBack = () => {
  const footerActiveState = useRecoilValue(activeState);
  const myPage = footerActiveState === 'my';
  const { state } = useLocation();

  const navigateTo =
    !state && myPage
      ? useNavigateTo('-1')
      : useNavigateTo(routeMap.get(footerActiveState));

  return { navigateTo };
};
