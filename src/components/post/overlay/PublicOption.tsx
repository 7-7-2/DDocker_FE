import { BackgroundLayer } from '@/components/post/overlay/BackgroundLayer';
import { PostOptions } from '@/components/post/overlay/PostOptions';
import { Option } from '@/components/post/overlay/Option';

const PublicOption = ({
  handleToggle,
  handleReport,
  postId
}: {
  handleToggle: () => void;
  handleReport: () => void;
  postId: string;
}) => {
  return (
    <BackgroundLayer onTouchEnd={handleToggle}>
      <PostOptions>
        <Option
          icon="update-post"
          option="수정하기"
          onTouchEnd={handleReport}
          postId={postId}
        />
      </PostOptions>
    </BackgroundLayer>
  );
};

export default PublicOption;
