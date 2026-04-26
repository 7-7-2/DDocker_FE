import ModalCTA from '@/components/common/ModalCTA';
import ActionModal from '@/components/common/ActionModal';
import { Option } from '@/components/post/overlay/Option';

import { useVerifyModalCTA } from '@/hooks/useVerifyModalCTA';
import { BUTTON_TEXTS, MODAL_CTA_TEXTS } from '@/constants/common';

const CommentActionModal = ({
  myComment,
  handleActionModal,
  handleDelete,
  handleReport
}: {
  myComment: boolean;
  handleActionModal: () => void;
  handleDelete: () => void;
  handleReport: () => void;
}) => {
  const { isModal, setIsModal } = useVerifyModalCTA();

  return (
    <>
      {isModal && (
        <ModalCTA
          buttonText={[BUTTON_TEXTS.cancel, BUTTON_TEXTS.delete]}
          title={MODAL_CTA_TEXTS.postComment.title}
          fn={handleDelete}
        />
      )}
      {!isModal && (
        <ActionModal handleActionModal={handleActionModal}>
          {myComment ? (
            <Option
              icon="delete-post"
              option={BUTTON_TEXTS.delete2}
              onClick={() => {
                setIsModal(true);
              }}
            />
          ) : (
            <Option
              icon="report"
              option={BUTTON_TEXTS.report}
              onClick={handleReport}
            />
          )}
        </ActionModal>
      )}
    </>
  );
};

export default CommentActionModal;
