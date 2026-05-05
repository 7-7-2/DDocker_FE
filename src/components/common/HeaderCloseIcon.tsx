import { useRecoilState } from 'recoil';
import Icon from '@/components/common/Icon';
import { footerShowState } from '@/atoms/atoms';
import { useSmartBack } from '@/hooks/useSmartBack';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

const HeaderCloseIcon = () => {
  const { smartClose } = useSmartBack();
  const [footerState, setFooterState] = useRecoilState(footerShowState);

  const handleTouch = () => {
    smartClose();
    !footerState && setFooterState(true);
  };

  return (
    <>
      <Icon
        {...iconPropsGenerator('close')}
        onClick={handleTouch}></Icon>
    </>
  );
};

export default HeaderCloseIcon;
