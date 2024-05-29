import { lazy } from 'react';
import { useParams } from 'react-router-dom';
import { useComposeHeader } from '@/hooks/useComposeHeader';

import SEOMeta from '@/components/common/SEOMeta';
import SEO_DATA from '@/constants/SEOData';

const PostRegister = lazy(() => import('../components/post/PostRegister'));
const PostDetail = lazy(() => import('../components/post/PostDetail'));

const Post = () => {
  const { postId } = useParams();
  const { type } = useParams();
  const register = postId === 'register';
  const update = type === 'update';

  const headerText = () => {
    if (register) {
      return '커피 등록 추가';
    }
    if (!register && update) {
      return '수정하기';
    }
    return '게시물';
  };

  useComposeHeader(false, headerText(), 'close');

  const metaData = () => {
    if (register) {
      return SEO_DATA.register;
    }
    if (!register && update) {
      return {
        ...SEO_DATA.update,
        pageUrl: `${SEO_DATA.update.pageUrl}/${postId}/update`
      };
    }
    return {
      ...SEO_DATA.post,
      pageUrl: `${SEO_DATA.post.pageUrl}/${postId}`
    };
  };

  return (
    <>
      <SEOMeta pageData={metaData()} />
      {register && <PostRegister />}
      {update && !register && (
        <PostRegister
          update
          postid={postId}
        />
      )}
      {!update && !register && postId && <PostDetail postNum={postId} />}
    </>
  );
};

export default Post;
