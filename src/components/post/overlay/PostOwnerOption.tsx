import { BackgroundLayer } from '@/components/post/overlay/BackgroundLayer';
import { PostOptions } from '@/components/post/overlay/PostOptions';
import { Option } from '@/components/post/overlay/Option';
import { useMutation } from '@tanstack/react-query';
import { deletePost } from '@/api/post';
import { useNavigateTo } from '@/hooks/useNavigateTo';

const PostOwnerOption = ({
  handleToggle,
  postId
}: {
  handleToggle: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  postId: string;
}) => {
  const { mutate: mutateDelete } = useMutation({ mutationFn: deletePost });
  const navigate = useNavigateTo('/posts');
  const handleDelete = () => {
    mutateDelete(postId, {
      onSuccess: navigate
    });
  };
  const handleUpdate = () => {};
  return (
    <BackgroundLayer onClick={handleToggle}>
      <PostOptions>
        <Option
          icon="update-post"
          option="수정하기"
          onTouchEnd={handleUpdate}
        />
        <Option
          icon="delete-post"
          option="삭제"
          onTouchEnd={handleDelete}
        />
      </PostOptions>
    </BackgroundLayer>
  );
};

export default PostOwnerOption;
