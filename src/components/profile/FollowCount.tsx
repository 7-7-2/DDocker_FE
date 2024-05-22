import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';
import useGetFollowCount from '@/hooks/profile/useGetFollowCount';
import useGetCheckFollowing from '@/hooks/profile/useGetCheckFollowing';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';
import { BUTTON_TEXTS } from '@/constants/common';
import { isModalState } from '@/atoms/atoms';
import { FollowCountProps } from '@/types/types';
import { followUser, unfollowUser } from '@/api/follow';
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
import { PROFILE_TEXTS } from '@/constants/profile';

const { following, follow1 } = BUTTON_TEXTS;
const { followCount: followCountText } = PROFILE_TEXTS;

const FollowCount = ({ data }: FollowCountProps) => {
  const navigate = useNavigate();
  const { signedIn } = useGetSignedIn();
  const { userId } = useCachedUserInfo();
  const setIsModal = useSetRecoilState(isModalState);

  const { userId: profileId, postCount } = data;

  const { isFollowing, getCheckFollowing } = useGetCheckFollowing(profileId);
  const { userFollowCount } = useGetFollowCount(profileId, isFollowing);

  const handleFollowBtn = async () => {
    !isFollowing && profileId && (await followUser(profileId));
    isFollowing && profileId && (await unfollowUser(profileId));
    getCheckFollowing();
  };

  const count = [
    { number: postCount, label: followCountText[0] },
    { number: userFollowCount?.followed, label: followCountText[1] },
    { number: userFollowCount?.following, label: followCountText[2] }
  ];

  const handleStatClick = (label: string) => () => {
    !(label === followCountText[1] || label === followCountText[2])
      ? null
      : signedIn
        ? navigate(`/follow/${profileId}`, { state: label })
        : setIsModal(true);
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
            onTouchEnd={handleStatClick(item.label)}>
            <StatNumber className={RecentSearch}>{item.number}</StatNumber>
            <StatLabel className={SumType}>{item.label}</StatLabel>
          </Stat>
        ))}
      </CountContainer>
      {signedIn && userId !== profileId && (
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
