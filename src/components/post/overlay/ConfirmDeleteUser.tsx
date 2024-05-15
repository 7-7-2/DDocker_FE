import ModalCTA from '@/components/common/ModalCTA';
import { BUTTON_TEXTS, MODAL_CTA_TEXTS } from '@/constants/common';
import { useHandleAuth } from '@/hooks/MyPage/useHandleAuth';

const { confirm, warning, subBtn } = MODAL_CTA_TEXTS.deleteAccount;

const ConfirmDeleteUser = () => {
  const { isConfirm, handleConfirmBtn, handleDeleteAccount } = useHandleAuth();

  return (
    <ModalCTA
      actionText={BUTTON_TEXTS.deleteAccount}
      text={!isConfirm ? confirm : warning}
      subBtnText={subBtn}
      isConfirm={isConfirm}
      fn={!isConfirm ? handleConfirmBtn : handleDeleteAccount}
    />
  );
};

export default ConfirmDeleteUser;
