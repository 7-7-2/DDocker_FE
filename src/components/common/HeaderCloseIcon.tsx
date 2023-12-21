import Icon from '@/components/common/Icon';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

//기능 추가필요(useClose수정)
const HeaderCloseIcon = () => {
  return (
    <>
      <Icon
        {...iconPropsGenerator('close')}
        onTouchEnd={useNavigateTo('-1')}></Icon>
    </>
  );
};

export default HeaderCloseIcon;
