import { deletePost } from '@/api/post';
import { BackgroundLayer } from '@/components/post/overlay/BackgroundLayer';
import ConfirmButtons from '@/components/post/overlay/ConfirmButtons';
import { PostOptions } from '@/components/post/overlay/PostOptions';
import { POST_TEXTS } from '@/constants/texts';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useMutation } from '@tanstack/react-query';
import { css } from 'styled-system/css';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { useCloudStorage } from '@/hooks/useCloudStorage';
import { usePostOptions } from '@/hooks/post/usePostOptions';
import { Justify } from '@/styles/layout';

const ConfirmDelete = ({
  postId,
  cancelConfirm,
  posts = false
}: {
  postId: string;
  cancelConfirm: <T extends HTMLElement>(
    e: React.MouseEvent<T, MouseEvent>
  ) => void;
  posts?: boolean;
}) => {
  const { mutateAsync: mutateDelete } = useMutation({ mutationFn: deletePost });
  const navigate = posts ? useNavigateTo('0') : useNavigateTo('/posts');

  const { userId } = useCachedUserInfo();
  const route = `post/${userId}/${postId}`;
  const { deleteStorage } = useCloudStorage();
  const { recoverFooterState } = usePostOptions();

  const handleStorage = async () => {
    await deleteStorage(route);
    recoverFooterState();
    navigate();
  };

  const handleDelete = () => {
    mutateDelete(postId, {
      onSuccess: handleStorage
    });
  };

  return (
    <BackgroundLayer onClick={cancelConfirm}>
      <PostOptions>
        <div className={Align}>
          <div className={Justify}>
            <div className={ConfirmText}>{POST_TEXTS.delete}</div>
          </div>
          <div className={ConfirmWarn}>{POST_TEXTS.warn}</div>
        </div>
        <ConfirmButtons
          cancelConfirm={cancelConfirm}
          handleDelete={handleDelete}
        />
      </PostOptions>
    </BackgroundLayer>
  );
};

const Align = css`
  align-self: center;
  margin-left: -20px;
`;

const ConfirmText = css`
  font-size: var(--font-sizes-sm);
  color: var(--colors-main-dark);
`;

const ConfirmWarn = css`
  font-size: var(--font-sizes-xs);
  align-self: center;
  color: var(--colors-subtext);
`;

export default ConfirmDelete;
