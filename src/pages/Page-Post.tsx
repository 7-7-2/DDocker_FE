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
      {!register && postid && <PostDetail postNum={postid} />}
    </>
  );
};

export default Post;
