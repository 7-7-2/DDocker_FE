import { BackgroundLayer } from '@/components/post/overlay/BackgroundLayer';
import { PostOptions } from '@/components/post/overlay/PostOptions';
import { Option } from '@/components/post/overlay/Option';
import { useNavigateTo } from '@/hooks/useNavigateTo';

import { BUTTON_TEXTS } from '@/constants/common';

const PostOwnerOption = ({
  cancleOptions,
  confirmDelete,
  postId
}: {
  cancleOptions: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  confirmDelete: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  postId: string;
}) => {
  const goToUpdate = useNavigateTo(`/post/${postId}/update`);
  const handleUpdate = () => {
    goToUpdate();
  };

  return (
    <BackgroundLayer onClick={cancleOptions}>
      <PostOptions>
        <Option
          icon="update-post"
          option={BUTTON_TEXTS.update2}
          onClick={handleUpdate}
        />
        <Option
          icon="delete-post"
          option={BUTTON_TEXTS.delete2}
          onClick={confirmDelete}
        />
      </PostOptions>
    </BackgroundLayer>
  );
};

export default PostOwnerOption;
