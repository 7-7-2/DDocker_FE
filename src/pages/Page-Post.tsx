import { lazy } from 'react';
import { useParams } from 'react-router-dom';
import { useComposeHeader } from '@/hooks/useComposeHeader';

const PostRegister = lazy(() => import('../components/post/PostRegister'));
const PostDetail = lazy(() => import('../components/post/PostDetail'));

const Post = () => {
  const { postid } = useParams();
  const register = postid === 'register';
  if (register) {
    useComposeHeader(false, '커피 등록 추가', 'close');
  }
  if (!register) {
    useComposeHeader(false, '게시물', 'close');
  }

  return (
    <>
      {register && <PostRegister />}
      {!register && (
        <PostDetail
          userId="zxc"
          NickName="커피안마셔안마셔"
          caffeine={12345}
        />
      )}
    </>
  );
};

export default Post;
