import { BackgroundLayer } from '@/components/post/overlay/BackgroundLayer';
import { PostOptions } from '@/components/post/overlay/PostOptions';
import { Option } from '@/components/post/overlay/Option';
import { useMutation } from '@tanstack/react-query';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useSetRecoilState } from 'recoil';
import { footerShowState } from '@/atoms/atoms';

const PostOwnerOption = ({
  cancleOptions,
  postId,
  setConfirm
}: {
  cancleOptions: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  postId: string;
  setConfirm: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}) => {
  const setFooterState = useSetRecoilState(footerShowState);

  const confirmDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    cancleOptions(e);
    setFooterState(false);
    setConfirm(e);
  };

  //등록 페이지 수정시 postId 전달 혹은 수정 페이지로 이동
  const handleUpdate = () => {
    console.log(postId);
  };

  return (
    <BackgroundLayer onClick={cancleOptions}>
      <PostOptions>
        <Option
          icon="update-post"
          option="수정하기"
          onTouchEnd={handleUpdate}
        />
        <Option
          icon="delete-post"
          option="삭제"
          onTouchEnd={confirmDelete}
        />
      </PostOptions>
    </BackgroundLayer>
  );
};

export default PostOwnerOption;
