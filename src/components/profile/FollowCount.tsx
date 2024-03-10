import { useEffect, useState } from 'react';

import { getUserFollowCounts } from '@/api/user';
import { FollowCountProps, UserFollowCountsTypes } from '@/types/types';
import { useNavigateTo } from '@/hooks/useNavigateTo';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Center, Column, Flex, MarginAuto } from '@/styles/layout';
import { Border16, Cursor, RecentSearch, SumType } from '@/styles/styles';

const FollowCount = ({ data }: FollowCountProps) => {
  const navigate = useNavigateTo('/FOLLOW');
  const { userId, postCount } = data;
  const [userFollowCount, setUserFollowCount] =
    useState<UserFollowCountsTypes>();

  const getUserFollowCount = async () => {
    const res = userId && (await getUserFollowCounts(userId));
    setUserFollowCount(res);
  };

  useEffect(() => {
    getUserFollowCount();
  }, [userId]);

  const count = [
    { number: postCount, label: '게시물' },
    { number: userFollowCount?.following, label: '팔로잉' },
    { number: userFollowCount?.followed, label: '팔로워' }
  ];

  const handleStatClick = (label: string) => {
    label === '게시물'
      ? null
      : (label === '팔로잉' || label === '팔로워') && navigate();
  };

  return (
    <Container className={cx(Flex, Cursor, Border16)}>
      {count.map((item, index) => (
        <Stat
          key={index}
          className={cx(
            Center,
            Column,
            MarginAuto,
            index === count.length - 1 ? 'lastStat' : ''
          )}
          onTouchEnd={() => handleStatClick(item.label)}>
          <StatNumber className={RecentSearch}>{item.number}</StatNumber>
          <StatLabel className={SumType}>{item.label}</StatLabel>
        </Stat>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: auto;
  height: 74px;
  padding: auto 0;
  background-color: var(--colors-tertiary);
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
export default FollowCount;
