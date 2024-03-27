import { useParams } from 'react-router-dom';

import FollowCount from '@/components/profile/FollowCount';
import PostsGrid from '@/components/profile/PostsGrid';
import ProfileDetail from '@/components/profile/ProfileDetail';
import CTA from '@/components/common/CTA';
import { InfinitePosts, UserProfileDataTypes } from '@/types/types';
import { useTargetInfiniteScroll } from '@/hooks/useTargetInfiniteScroll';
import { getProfilePostIQParam } from '@/hooks/useInfiniteScroll';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { PROFILE_TEXTS } from '@/constants/Profile';

import { Default, Semibold } from '@/styles/styles';
import { Between, Column, Justify } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const {
  anonymous: { text, actionText, title }
} = PROFILE_TEXTS;

const Profile = () => {
  useComposeHeader(true, '', 'icons');
  const { userId } = useParams();
  const goToSignIn = useNavigateTo('/start/1');

  const handleSignInBtn = () => {
    goToSignIn();
  };

  if (userId === 'Non-members') {
    const anonymousUser = (
      <AnonymousCard className={cx(Default, Column, Justify)}>
        <Title className={Semibold}>{title}</Title>
        <CTA
          text={text}
          actionText={actionText}
          btn
          fn={handleSignInBtn}
        />
      </AnonymousCard>
    );

    return <div>{anonymousUser}</div>;
  }

  const ProfilePostIQParam: InfinitePosts = getProfilePostIQParam();
  const { data, ref } = useTargetInfiniteScroll(ProfilePostIQParam);
  const postsData = data as unknown as UserProfileDataTypes[];

  const followCountData = {
    userId: userId,
    postCount: postsData && postsData[0].allCount
  };

  return (
    <div>
      <Container className={Column}>
        <div className={cx(Column, Between)}>
          <ProfileDetail userId={userId} />
          <FollowCount data={followCountData} />
        </div>
      </Container>
      <PostsGrid data={postsData} />
      <Target ref={ref} />
    </div>
  );
};

const Container = styled.div`
  position: relative;
  width: auto;
  margin: 20px 0;
`;
const Target = styled.div`
  width: 1px;
`;

const AnonymousCard = styled.div`
  width: inherit;
  height: 364px;
  border-radius: 16px;
  margin-top: 28px;
  padding: 0 52px;
`;
const Title = styled.div`
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 22px;
`;

export default Profile;
