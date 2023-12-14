import { useState } from 'react';
import UserListItem from '@/components/follow/UserListItem';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { FollowCountProps, UserProfile } from '@/types/types';
import { Flex, FlexCenter, Full } from '@/styles/layout';
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
      cafein: 34054
    },
    {
      id: 2,
      loginName: '커피안마셔안마셔',
      cafein: 12345
    }
  ];

  const followings: UserProfile[] = [
    {
      id: 1,
      loginName: '커피안마셔안마셔',
      cafein: 12345
    },
    {
      id: 2,
      loginName: '커피마셔마셔',
      cafein: 34054
    }
  ];

  const usersToShow = isActiveBtn === '팔로워' ? followers : followings;

  return (
    <Container className={Flex}>
      <ToggleArea className={cx(FlexCenter, Full)}>
        <ToggleButton
          className={cx(FlexCenter, isActiveBtn === '팔로워' ? ' active' : '')}
          onTouchEnd={handleButtonClick}
          value="팔로워">
          팔로워
        </ToggleButton>
        <ToggleButton
          className={cx(FlexCenter, isActiveBtn === '팔로잉' ? 'active' : '')}
          onTouchEnd={handleButtonClick}
          value="팔로잉">
          팔로잉
        </ToggleButton>
      </ToggleArea>
      <UserListItem users={usersToShow} />
    </Container>
  );
};

const Container = styled.div`
  flex-direction: column;
  margin-top: 17px;
`;

const ToggleArea = styled.div`
  border-bottom: 1px solid #ccc;
`;

const ToggleButton = styled.button`
  width: 170px;
  height: 40px;
  color: #a6a6a6;
  border: 1px solid transparent;
  border-left: none;
  border-right: none;
  cursor: pointer;
  &.active {
    color: #ff701e;
    border-bottom: 2px solid #ff701e;
  }
`;

export default Follow;
