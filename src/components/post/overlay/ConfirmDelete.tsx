import { useMutation } from '@tanstack/react-query';
import ModalCTA from '@/components/common/ModalCTA';

import { deletePost } from '@/api/post';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { useCloudStorage } from '@/hooks/useCloudStorage';
import { usePostOptions } from '@/hooks/post/usePostOptions';

import { POST_TEXTS } from '@/constants/texts';
import { BUTTON_TEXTS } from '@/constants/common';

const ConfirmDelete = ({
  postId,
  posts = false
}: {
  postId: string;
  posts?: boolean;
}) => {
  const { mutateAsync: mutateDelete } = useMutation({ mutationFn: deletePost });
  const navigate = !posts ? useNavigateTo('-1') : useNavigateTo('/posts');

  const { userId } = useCachedUserInfo();
  const { deleteStorage } = useCloudStorage();
  const { setIsPostOption, recoverFooterState } = usePostOptions();

  const handleStorage = async () => {
    await deleteStorage('post', userId, postId);
    setIsPostOption(false);
    recoverFooterState();
    navigate();
  };

  const handleDelete = () => {
    mutateDelete(postId, {
      onSuccess: handleStorage
    });
  };

  return (
    <ModalCTA
      buttonText={[BUTTON_TEXTS.cancel, BUTTON_TEXTS.delete]}
      title={POST_TEXTS.delete}
      description={POST_TEXTS.warn}
      fn={handleDelete}
    />
  );
};

export default ConfirmDelete;
