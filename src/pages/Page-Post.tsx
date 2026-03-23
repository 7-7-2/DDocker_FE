import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

import SEOMeta from '@/components/common/SEOMeta';

import { useComposeHeader } from '@/hooks/useComposeHeader';
import { HEADER_TEXTS } from '@/constants/common';
import SEO_DATA from '@/constants/SEOData';

const { post } = HEADER_TEXTS;

const PostRegister = lazy(
  () => import('../components/post/postRegister/PostRegister')
);
const PostDetail = lazy(() => import('../components/post/PostDetail'));

const Post = () => {
  const { postId } = useParams();
  const { type } = useParams();

  const register = postId === 'register';
  const caffeineRegister = type === 'caffeine';
  const update = type === 'update';

  const headerText = () => {
    if (register && !caffeineRegister) {
      return post.postRegister;
    }
    if (register && caffeineRegister) {
      return post.caffeineRegister;
    }
    if (!register && update) {
      return post.update;
    }
    return post.post;
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
      {register && (
        <Suspense>
          <PostRegister />
        </Suspense>
      )}
      {update && !register && (
        <Suspense>
          <PostRegister
            update
            postid={postId}
          />
        </Suspense>
      )}
      {!update && !register && postId && (
        <Suspense>
          <PostDetail postNum={postId} />
        </Suspense>
      )}
    </>
  );
};

export default Post;
