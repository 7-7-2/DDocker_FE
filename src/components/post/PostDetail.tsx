import MiniProfile from '@/components/common/MiniProfile';
import PostSocial from '@/components/post/PostSocial';
import PostComments from '@/components/post/PostComments';
import CaffeineInfo from '@/components/post/CaffeineInfo';
import PostedAt from '@/components/post/PostedAt';
import Icon from '@/components/common/Icon';
import { Input } from '@/components/common/Input';

import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { INPUT_TEXTS } from '@/constants/common';
import { styled } from 'styled-system/jsx';
import { Flex, Between, Align } from '@/styles/layout';
import { cx } from 'styled-system/css';
import { PaddingTB10, PostContent } from '@/styles/styles';
import { SimplifyUser } from '@/types/types';

// POST 정보를 수신 => 하위 props에 전달
// 1. PostSocial => 좋아요, 댓글 수
// 2. CaffeineInfo => 카페인 정보
// 3. PostedAt => 게시글 작성 시간
const { type } = INPUT_TEXTS;
const { comment } = type;

const PostDetail = ({ userId, NickName, caffeine }: SimplifyUser) => {
  const handleTouch = () => {};

  return (
    <>
      <UserProfile className={cx(Flex, Between, Align)}>
        <MiniProfile
          userId={userId}
          NickName={NickName}
          caffeine={caffeine}
        />
        <Icon {...iconPropsGenerator('user-more')} />
      </UserProfile>
      <DetailImg src="https://i.namu.wiki/i/d1A_wD4kuLHmOOFqJdVlOXVt1TWA9NfNt_HA0CS0Y_N0zayUAX8olMuv7odG2FiDLDQZIRBqbPQwBSArXfEJlQ.webp" />
      <PostSocial />
      <PostContent>COFFEE~!</PostContent>
      <CaffeineInfo brand={'바나프레소'} />
      <PostedAt at={'20'} />
      <Divider />
      <PostComments length={5} />
      <Divider />
      <div className={PaddingTB10}>
        <Input
          type={comment.typeName}
          handleEvent={handleTouch}
        />
      </div>
    </>
  );
};

const UserProfile = styled.div`
  padding: 12px 0;
`;

const Divider = styled.div`
  position: relative;
  &::after {
    content: '';
    position: absolute;
    border-top: 1px solid #edecec;
    left: -20px;
    width: calc(50% + 20px);
  }
  &::before {
    content: '';
    position: absolute;
    border-top: 1px solid #edecec;
    right: -20px;
    width: calc(50% + 20px);
  }
`;

const DetailImg = styled.img`
  display: block;
  position: relative;
  margin-left: -20px;
  margin-right: -20px;
  height: 100vw;
  @media (max-width: 500px) {
    min-width: 100vw;
  }
  @media (min-width: 500px) {
    max-width: 500px;
  }
  max-height: 500px;
  object-fit: fill;
`;

export default PostDetail;
