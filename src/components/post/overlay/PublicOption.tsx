import { BackgroundLayer } from '@/components/post/overlay/BackgroundLayer';
import { PostOptions } from '@/components/post/overlay/PostOptions';
import { Option } from '@/components/post/overlay/Option';

const PublicOption = ({
  handleToggle,
  postId
}: {
  handleToggle: () => void;
  postId: string;
}) => {
  // cause => userInput
  const reportValue = {
    postId: postId
    // cause: '욕설'
  };
  const handleReport = () => {};
  return (
    <BackgroundLayer onTouchEnd={handleToggle}>
      <PostOptions>
        <Option
          icon="update-post"
          option="수정하기"
          onTouchEnd={handleReport}
        />
      </PostOptions>
    </BackgroundLayer>
  );
};

export default PublicOption;
