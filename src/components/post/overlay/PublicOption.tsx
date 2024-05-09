import { BackgroundLayer } from '@/components/post/overlay/BackgroundLayer';
import { PostOptions } from '@/components/post/overlay/PostOptions';
import { Option } from '@/components/post/overlay/Option';
import { useNavigateTo } from '@/hooks/useNavigateTo';

const PublicOption = ({
  handleToggle,
  postId
}: {
  handleToggle: (e: React.MouseEvent<HTMLDivElement>) => void;
  postId: string;
}) => {
  const goToReport = useNavigateTo(`/report/${postId}`);
  const handleReport = () => {
    goToReport();
  };

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
