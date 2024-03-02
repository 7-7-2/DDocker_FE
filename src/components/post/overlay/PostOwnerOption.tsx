import { BackgroundLayer } from "@/components/post/overlay/BackgroundLayer";
import { PostOptions } from "@/components/post/overlay/PostOptions";
import { Option } from "@/components/post/overlay/Option";

const PostOwnerOption = ({
  handleToggle,
  handleUpdate,
  handleDelete,
  postId
}: {
  handleToggle: () => void;
  handleUpdate: () => void;
  handleDelete: () => void;
  postId: string;
}) => {
  return (
    <BackgroundLayer onTouchEnd={handleToggle}>
      <PostOptions>
        <Option
          icon="update-post"
          option="수정하기"
          onTouchEnd={handleUpdate}
          postId={postId}
        />
        <Option
          icon="delete-post"
          option="삭제"
          onTouchEnd={handleDelete}
          postId={postId}
        />
      </PostOptions>
    </BackgroundLayer>
  );
};

export default PostOwnerOption;
