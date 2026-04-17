import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { useSmartBack } from '@/hooks/post/useSmartBack';

const HeaderBackIcon = () => {
  const { navigateTo } = useSmartBack();

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
