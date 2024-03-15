import { BackgroundLayer } from '@/components/post/overlay/BackgroundLayer';
import { PostOptions } from '@/components/post/overlay/PostOptions';
import { Option } from '@/components/post/overlay/Option';

const PublicOption = ({
  handleToggle,
  postId
}: {
  handleToggle: (e: React.MouseEvent<HTMLDivElement>) => void;
  postId: string;
}) => {
  // cause => userInput
  const reportValue = {
    postId: postId
    // cause: '욕설'
  };
  const handleReport = () => {};
  return (
    <BackgroundLayer onClick={handleToggle}>
      <PostOptions>
        <Option
          icon="report"
          option="신고하기"
          onTouchEnd={handleReport}
        />
      </PostOptions>
    </BackgroundLayer>
  );
};

export default PublicOption;
