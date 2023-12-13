import Icon from '@/components/common/Icon';
import { useClose } from '@/hooks/useClose';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

//기능 추가필요(useClose수정)
const HeaderCloseIcon = () => {
  const { handleTouch } = useClose();

  return (
    <>
      <Icon
        {...iconPropsGenerator('close')}
        onTouchEnd={handleTouch}></Icon>
    </>
  );
};

export default HeaderCloseIcon;
