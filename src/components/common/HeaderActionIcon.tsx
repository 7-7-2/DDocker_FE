import { useRecoilState } from 'recoil';
import Icon from '@/components/common/Icon';
import { isModalState } from '@/atoms/atoms';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

const HeaderActionIcon = () => {
  const [isModal, setIsModal] = useRecoilState(isModalState);
  const handleModal = () => {
    setIsModal(!isModal);
  };

  return (
    <>
      <Icon
        {...iconPropsGenerator('action')}
        onClick={handleModal}
      />
    </>
  );
};

export default HeaderActionIcon;
