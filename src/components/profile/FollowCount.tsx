import { useQuery } from '@tanstack/react-query';

import Button from '@/components/common/Button';
import { FollowCountProps } from '@/types/types';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import useGetFollowCount from '@/hooks/profile/useGetFollowCount';
import useGetCheckFollowing from '@/hooks/profile/useGetCheckFollowing';
import useGetCacheData from '@/hooks/useGetCacheData';
import { BUTTON_TEXTS } from '@/constants/common';
import { followUser, unfollowUser } from '@/api/follow';
import { useNavigate } from 'react-router-dom';
import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Center, Column, Flex } from '@/styles/layout';
import {
  Border16,
  Cursor,
  FollowBtn,
  FollowingBtn,
  RecentSearch,
  SumType
} from '@/styles/styles';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';

const { following, follow1 } = BUTTON_TEXTS;
const FollowCount = ({ data }: FollowCountProps) => {
  const { signedIn } = useGetSignedIn();

  const navigate = useNavigate();
  const { userId: ProfileId, postCount } = data;
  const { isFollowing, getCheckFollowing } = useGetCheckFollowing(ProfileId);
  const { userFollowCount } = useGetFollowCount(ProfileId, isFollowing);

  const { userId } = useCachedUserInfo();

  const handleFollowBtn = async () => {
    !isFollowing && ProfileId && (await followUser(ProfileId));
    isFollowing && ProfileId && (await unfollowUser(ProfileId));
    getCheckFollowing();
  };

  const count = [
    { number: postCount, label: '게시물' },
    { number: userFollowCount?.following, label: '팔로잉' },
    { number: userFollowCount?.followed, label: '팔로워' }
  ];

  const handleStatClick = (label: string) => () => {
    label === '게시물'
      ? null
      : (label === '팔로잉' || label === '팔로워') &&
        navigate(`/follow/${data.userId}`, { state: label });
  };

  return (
    <Container className={cx(Column, Cursor, Border16)}>
      <CountContainer className={Flex}>
        {count.map((item, index) => (
          <Stat
            key={index}
            className={cx(
              Center,
              Column,
              index === count.length - 1 ? 'lastStat' : ''
            )}
            onTouchEnd={signedIn && handleStatClick(item.label)}>
            <StatNumber className={RecentSearch}>{item.number}</StatNumber>
            <StatLabel className={SumType}>{item.label}</StatLabel>
          </Stat>
        ))}
      </CountContainer>
      {userId !== ProfileId && (
        <Button
          text={isFollowing ? following : follow1}
          onTouchEnd={handleFollowBtn}
          className={cx(MarginTop, isFollowing ? FollowingBtn : FollowBtn)}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: auto;
  background-color: var(--colors-tertiary);
  padding: 16px;
`;

const CountContainer = styled.div`
  height: 42px;
  margin: 0 -16px;
`;

const Stat = styled.div`
  flex-grow: 1;
  border-right: 1px solid #dbdbdb;
  &.lastStat {
    border-right: none;
  }
`;

const StatNumber = styled.li`
  list-style-type: none;
`;

const StatLabel = styled.li`
  list-style-type: none;
`;

const MarginTop = css`
  margin-top: 14px;
`;
export default FollowCount;
