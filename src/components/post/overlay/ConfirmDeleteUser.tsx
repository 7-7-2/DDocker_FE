import ModalCTA from '@/components/common/ModalCTA';
import { useHandleAuth } from '@/hooks/MyPage/useHandleAuth';

const ConfirmDeleteUser = () => {
  const { isConfirm, handleConfirmBtn, handleDeleteAccount } = useHandleAuth();

  return (
    <ModalCTA
      actionText={'탈퇴하기'}
      text={
        !isConfirm
          ? '정말 탈퇴하시겠습니까?'
          : `회원 탈퇴 시 
            누적 데이터가 모두 삭제됩니다`
      }
      subBtnText={'이전화면으로 돌아가기'}
      isConfirm={isConfirm}
      fn={!isConfirm ? handleConfirmBtn : handleDeleteAccount}
    />
  );
};

export default ConfirmDeleteUser;
