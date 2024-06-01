import { footerShowState } from '@/atoms/atoms';
import Icon from '@/components/common/Icon';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { useRecoilState } from 'recoil';

const HeaderCloseIcon = () => {
  const goToBack = useNavigateTo('-1');
  const [footerState, setFooterState] = useRecoilState(footerShowState);
  const handleTouch = () => {
    !footerState && setFooterState(true);
    goToBack();
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
