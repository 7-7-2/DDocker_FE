import Header from '../common/Header';
import HeaderCloseIcon from '@/components/common/HeaderCloseIcon';
import Icon from 'components/common/Icon';
import { styled } from 'styled-system/jsx';
import { FlexCenter, MarginAuto, Flex } from '@/styles/layout';
import { cx } from 'styled-system/css';

const MyProfile = () => {
  const handleFormSubmit = () => {
    console.log('저장하기');
  };
  const handleExitedUser = () => {
    console.log('회원 탈퇴');
  };
  return (
    <>
      <Header
        logo={<></>}
        text={'프로필 수정'}
        icons={<HeaderCloseIcon />}
      />
      <Wrapper className={FlexCenter}>
        <Container className={Flex}>
          <Box className={cx(FlexCenter, MarginAuto)}>
            <User>
              <Icon
                id="icon-users"
                size="70"
              />
            </User>
            <Edit>
              <Icon
                id="icon-edit"
                size="15"
              />
            </Edit>
          </Box>
        </Container>
        <InputArea />
      </Wrapper>

      <ExitButton onTouchEnd={handleExitedUser}>회원 탈퇴</ExitButton>

      <SaveButton
        className={FlexCenter}
        onTouchEnd={handleFormSubmit}>
        저장하기
      </SaveButton>
    </>
  );
};

export default MyProfile;

const Wrapper = styled.div`
  margin-top: 20px;
  gap: 80px;
  flex-direction: column;
`;

const Container = styled.div`
  position: relative;
  margin: auto;
  width: 94px;
  height: 94px;
  border-radius: 9999px;
  background-color: #d9d9d9;
`;

const Box = styled.div`
  width: 54px;
  height: 54px;
  position: relative;
`;

const User = styled.div``;
const Edit = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  padding: 5px;
  background-color: #d9d9d9;
  bottom: -15px;
  right: -25px;
  border: 1px solid #fff;
  border-radius: 50%;
  z-index: 1;
  cursor: pointer;
`;

const InputArea = styled.div`
  width: 335px;
  height: 50px;
  background-color: red;
`;

const ExitButton = styled.span`
  font-size: var(--font--sizes-sm);
  font-weight: 400;
  line-height: 22px;
  color: #767676;
  margin: 16px 20px;
  display: inline-block;
  text-decoration-line: underline;
  cursor: pointer;
`;

const SaveButton = styled.button`
  margin: auto;
  width: 335px;
  height: 60px;
  background-color: #555;
  border-radius: 16px;
  font-size: var(--font-sizes-base);
  color: var(--colors-tertiary);
  cursor: pointer;
`;
