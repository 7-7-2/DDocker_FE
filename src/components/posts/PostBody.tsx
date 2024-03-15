import { PostContent } from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import CafeDetail from '@/components/post/CafeDetail';
import { PaddingT12 } from '@/styles/styles';
import { FollowingPost } from '@/types/types';

const PostBody = ({
  postTitle,
  photo,
  caffeine,
  shot,
  menu,
  brand,
  onTouchEnd
}: Pick<
  FollowingPost,
  'postTitle' | 'photo' | 'caffeine' | 'shot' | 'menu' | 'brand'
> & { onTouchEnd: () => void }) => {
  const CafeDetailProps = {
    brand,
    caffeine,
    shot,
    menu,
    className: PaddingT12,
    posts: true,
    onTouchEnd
  };
  return (
    <>
      <PostContent onClick={onTouchEnd}>{postTitle}</PostContent>
      <PostImg
        src={photo}
        onClick={onTouchEnd}
      />
      <CafeDetail {...CafeDetailProps} />
    </>
  );
};

const PostImg = styled.img`
  margin-top: -4px;
  border-radius: 16px;
`;

export default PostBody;
