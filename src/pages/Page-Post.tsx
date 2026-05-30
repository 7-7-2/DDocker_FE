import { Suspense, lazy, useLayoutEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import SEOMeta from '@/components/common/SEOMeta';
import { HEADER_TEXTS } from '@/constants/common';
import FavoriteMenuEditPage from '@/components/post/postRegister/FavoriteMenuEditPage';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import SEO_DATA from '@/constants/SEOData';
import { footerShowState } from '@/atoms/atoms';

const { post } = HEADER_TEXTS;

const PostRegister = lazy(
  () => import('../components/post/postRegister/PostRegister')
);
const RegistrationSuccessView = lazy(
  () => import('../components/post/postRegister/RegistrationSuccessView')
);
const PostDetail = lazy(() => import('../components/post/PostDetail'));

const Post = () => {
  const setFooterState = useSetRecoilState(footerShowState);
  useLayoutEffect(() => {
    setFooterState(false);
  }, []);

  const { postId } = useParams();
  const { type } = useParams();
  const { state } = useLocation();

  const register = postId === 'register';
  const update = type === 'update';
  const caffeine = type === 'caffeine';
  const favorites = state === 'favoriteEdit';

  const header = () => {
    if (register && !caffeine) {
      return ['', post.postRegister, 'close'];
    }
    if (register && caffeine) {
      return ['', post.caffeineRegister, 'close'];
    }
    if (!register && update) {
      return ['', post.update, 'close'];
    }
    if (!register && caffeine && !favorites) {
      return ['', '', 'close'];
    }
    if (!register && caffeine && !favorites) {
      return ['back', post.favorites, ''];
    }
    return ['back', post.post, ''];
  };

  useComposeHeader(...header());

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
    if (!register && caffeine) {
      return {
        ...SEO_DATA.registerSuccess,
        pageUrl: `${SEO_DATA.registerSuccess.pageUrl}/${postId}/caffeine`
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
      {!register && caffeine && !favorites && (
        <Suspense>
          <RegistrationSuccessView />
        </Suspense>
      )}
      {!register && caffeine && favorites && (
        <Suspense>
          <FavoriteMenuEditPage />
        </Suspense>
      )}
      {!update && !register && !caffeine && postId && (
        <Suspense>
          <PostDetail postNum={postId} />
        </Suspense>
      )}
    </>
  );
};

export default Post;
