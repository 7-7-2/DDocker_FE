import { useState } from 'react';
import Icon from 'components/common/Icon';
import { userNickName, userName, userEmail } from '@/constants/Profile';
import { styled } from 'styled-system/jsx';
import { FlexCenter, Full, Center, MarginAuto, Flex } from '@/styles/layout';
import { cx } from 'styled-system/css';

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(userNickName.user1);

  const handleUserProfileImgChanged = () => {
    console.log('1');
  };
  const handleSaveButtonClick = () => {
    setIsEditing(false);
    userNickName.user1 = editedText;
  };
  const handleIconClick = () => {
    setIsEditing(true);
  };

  return (
    <Wrap className={cx(FlexCenter, Full)}>
      <Container className={Flex}>
        <Box className={cx(Center, MarginAuto)}>
          <Icon
            id="icon-user"
            size="54"
          />
        </Box>
        <EditButton
          className={FlexCenter}
          onTouchEnd={handleUserProfileImgChanged}>
          편집
        </EditButton>
      </Container>
      <EditArea className={FlexCenter}>
        {isEditing ? (
          <>
            <InputButton
              type="text"
              value={editedText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditedText(e.target.value)
              }
            />
            <IconArea>
              <Icon
                id="icon-edit"
                size="24"
                onTouchEnd={handleSaveButtonClick}
              />
            </IconArea>
          </>
        ) : (
          <>
            <Span>{userNickName.user1}</Span>
            <IconArea>
              <Icon
                id="icon-edit"
                size="24"
                onTouchEnd={handleIconClick}
              />
            </IconArea>
          </>
        )}

        {/* <Span>{userNickName.user1}</Span>
        <InputButton>
          <Icon
            id="icon-edit"
            size="24"
          />
        </InputButton> */}
      </EditArea>
      <UserInfo className={FlexCenter}>
        <Span>{userName.loginName}</Span>
        <Span>{userEmail.eMail}</Span>
      </UserInfo>
      <Border className={cx(Flex, Full)} />
    </Wrap>
  );
};

export default MyProfile;

const Wrap = styled.div`
  flex-direction: column;
`;

const Container = styled.div`
  width: 94px;
  height: 94px;
  border-radius: 9999px;
  background-color: #d9d9d9;
  margin-top: 110px;
  flex-direction: column;
`;

const Box = styled.div`
  margin-top: 15px;
  width: 54px;
  height: 54px;
`;

const EditButton = styled.button`
  width: 100%;
  cursor: pointer;
`;

const IconArea = styled.div`
  margin: 15px 0px 0px 10px;
`;

const EditArea = styled.div`
  flex-direction: row;
`;

const InputButton = styled.input`
  margin: 20px 0px 0px 10px;
  cursor: pointer;
`;
const Span = styled.span`
  margin-top: 20px;
`;

const UserInfo = styled.div`
  flex-direction: column;
`;

const Border = styled.div`
  border-bottom: 1px solid #e6e4e4;
  padding-top: 50px;
`;
