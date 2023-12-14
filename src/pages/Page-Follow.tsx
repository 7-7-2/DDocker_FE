import { useState } from 'react';
import UserListItem from '@/components/follow/UserListItem';
import { Text } from '@/constants/texts';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { FollowCountProps, UserProfile } from '@/types/types';
import { Column, FlexCenter, Full, TextGray } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const Follow: React.FC<FollowCountProps> = () => {
  useComposeHeader(false, '커피좋아', '');
  const [isActiveBtn, setIsActiveBtn] = useState('팔로워');

  const handleButtonClick = (e: React.TouchEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsActiveBtn(e.currentTarget?.value || '팔로워');
  };

  const followers: UserProfile[] = [
    {
      id: 1,
      loginName: '커피마셔마셔',
      caffeine: 34054
    },
    {
      id: 2,
      loginName: '커피안마셔안마셔',
      caffeine: 12345
    }
  ];

  const followings: UserProfile[] = [
    {
      id: 1,
      loginName: '커피안마셔안마셔',
      caffeine: 12345
    },
    {
      id: 2,
      loginName: '커피마셔마셔',
      caffeine: 34054
    }
  ];

  const usersToShow = isActiveBtn === '팔로워' ? followers : followings;

  return (
    <Container className={Column}>
      <ToggleArea className={cx(FlexCenter, Full)}>
        <ToggleButton
          className={cx(FlexCenter, isActiveBtn === '팔로워' ? ' active' : '')}
          onTouchEnd={handleButtonClick}
          value="팔로워">
          {Text.ToggleFollowedBtn}
        </ToggleButton>
        <ToggleButton
          className={cx(
            FlexCenter,
            TextGray,
            isActiveBtn === '팔로잉' ? 'active' : ''
          )}
          onTouchEnd={handleButtonClick}
          value="팔로잉">
          {Text.toggleFollowingBtn}
        </ToggleButton>
      </ToggleArea>
      <UserListItem users={usersToShow} />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 17px;
`;
const ToggleArea = styled.div`
  border-bottom: 1px solid #ccc;
`;
const ToggleButton = styled.button`
  width: 170px;
  height: 40px;
  border: 1px solid transparent;
  border-left: none;
  border-right: none;
  cursor: pointer;
  &.active {
    color: var(--colors-main);
    border-bottom: 2px solid var(--colors-main);
  }
`;

export default Follow;
