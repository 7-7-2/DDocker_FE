import { deletePost } from '@/api/post';
import { BackgroundLayer } from '@/components/post/overlay/BackgroundLayer';
import ConfirmButtons from '@/components/post/overlay/ConfirmButtons';
import { PostOptions } from '@/components/post/overlay/PostOptions';
import { POST_TEXTS } from '@/constants/texts';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useMutation } from '@tanstack/react-query';
import { css } from 'styled-system/css';

const ConfirmDelete = ({
  postId,
  cancelConfirm
}: {
  postId: string;
  cancelConfirm: <T extends HTMLElement>(
    e: React.MouseEvent<T, MouseEvent>
  ) => void;
}) => {
  const { mutate: mutateDelete } = useMutation({ mutationFn: deletePost });
  const navigate = useNavigateTo('/posts');

  const handleDelete = () => {
    mutateDelete(postId, {
      onSuccess: navigate
    });
  };

  return (
    <BackgroundLayer onClick={cancelConfirm}>
      <PostOptions>
        <div className={ConfirmText}>{POST_TEXTS.delete}</div>
        <ConfirmButtons
          cancelConfirm={cancelConfirm}
          handleDelete={handleDelete}
        />
      </PostOptions>
    </BackgroundLayer>
  );
};

const ConfirmText = css`
  font-size: var(--font-sizes-sm);
  align-self: center;
  margin-left: -20px;
  color: var(--colors-main-dark);
`;

export default ConfirmDelete;
