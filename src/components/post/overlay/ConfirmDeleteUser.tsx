import ModalCTA from '@/components/common/ModalCTA';
import { BUTTON_TEXTS, MODAL_CTA_TEXTS } from '@/constants/common';
import { useHandleAuth } from '@/hooks/MyPage/useHandleAuth';

const { confirm, warning } = MODAL_CTA_TEXTS.deleteAccount;
const { notNow, deleteAccount } = BUTTON_TEXTS;

const ConfirmDeleteUser = () => {
  const { handleDeleteAccount } = useHandleAuth();

  return (
    <ModalCTA
      buttonText={[deleteAccount, notNow]}
      title={confirm}
      description={warning}
      fn={handleDeleteAccount}
    />
  );
};

export default ConfirmDeleteUser;
