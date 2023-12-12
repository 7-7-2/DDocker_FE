import Icon from '@/components/common/Icon';
import { ICON_CLOSE } from '@/constants/icons';
import { useClose } from '@/hooks/useClose';

const HeaderCloseIcon = () => {
  const { handleTouch } = useClose();

  return (
    <>
      <Icon
        {...ICON_CLOSE}
        onTouchEnd={handleTouch}></Icon>
    </>
  );
};

export default HeaderCloseIcon;
