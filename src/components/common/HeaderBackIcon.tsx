import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { useSmartBack } from '@/hooks/useSmartBack';

const HeaderBackIcon = () => {
  const { smartBack } = useSmartBack();

  const navTofooterState = () => {
    smartBack();
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
