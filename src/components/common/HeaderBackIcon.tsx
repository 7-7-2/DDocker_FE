import { useRecoilValue } from 'recoil';

import Icon from '@/components/common/Icon';

import { activeState } from '@/atoms/atoms';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { routeMap } from '@/utils/getRoute';

const HeaderBackIcon = () => {
  const footeractiveState = useRecoilValue(activeState);
  const navigateTo = useNavigateTo(routeMap.get(footeractiveState));
  const navTofooterState = () => {
    navigateTo();
  };

  return (
    <div>
      <nav onClick={navTofooterState}>
        <Icon {...iconPropsGenerator('back')} />
      </nav>
    </div>
  );
};

export default HeaderBackIcon;
