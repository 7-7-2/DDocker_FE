import PostSocial from '@/components/post/PostSocial';
import MiniProfile from '@/components/common/MiniProfile';
import Icon from '@/components/common/Icon';
import CafeDetail from '@/components/post/CafeDetail';

import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { SimplifyUser } from '@/types/types';
import { styled } from 'styled-system/jsx';
import { Flex, Between } from '@/styles/layout';
import { cx } from 'styled-system/css';
import { PostContent } from '@/styles/styles';
import { PaddingT12 } from '@/styles/styles';

const PostCard = ({ userId, NickName, caffeine }: SimplifyUser) => {
  return (
    <Container>
      <UserProfile className={cx(Flex, Between)}>
        <MiniProfile
          userId={userId}
          NickName={NickName}
          caffeine={caffeine}
        />
        <Icon {...iconPropsGenerator('user-more')} />
      </UserProfile>
      <PostContent>맛있는 오늘의 커피</PostContent>
      <PostImg src="https://i.namu.wiki/i/d1A_wD4kuLHmOOFqJdVlOXVt1TWA9NfNt_HA0CS0Y_N0zayUAX8olMuv7odG2FiDLDQZIRBqbPQwBSArXfEJlQ.webp" />
      <CafeDetail
        brand={'바나프레소'}
        className={PaddingT12}
        posts={true}
      />
      <div>
        <PostSocial posts={true} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  /* border: 1px solid #767676; */
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
`;

const UserProfile = styled.div`
  padding-bottom: 12px;
`;

const PostImg = styled.img`
  margin-top: -4px;
  border-radius: 16px;
`;

export default PostCard;
