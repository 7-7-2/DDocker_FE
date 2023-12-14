import Icon from '@/components/common/Icon';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { FlexCenter, MarginAuto, Flex, Justify } from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const MyProfile = () => {
  useComposeHeader(false, '프로필 수정', 'close');
  const handleFormSubmit = () => {
    console.log('저장하기');
  };
  const handleExitedUser = () => {
    console.log('회원 탈퇴');
  };
  return (
    <>
      <Wrapper className={FlexCenter}>
        <Container className={cx(Flex, MarginAuto)}>
          <Box className={cx(FlexCenter, MarginAuto)}>
            <User>
              <Icon {...iconPropsGenerator('user', '100')} />
            </User>
            <Edit>
              <Icon {...iconPropsGenerator('edit-photo', '32')} />
            </Edit>
          </Box>
        </Container>
        <InputArea />
      </Wrapper>

      <ExitButton onTouchEnd={handleExitedUser}>회원 탈퇴</ExitButton>

      <ButtonArea className={Justify}>
        <SaveButton
          className={cx(FlexCenter)}
          onTouchEnd={handleFormSubmit}>
          저장하기
        </SaveButton>
      </ButtonArea>
    </>
  );
};

export default MyProfile;

const Wrapper = styled.div`
  margin-top: 20px;
  gap: 80px;
  flex-direction: column;
  position: relative;
`;

const Container = styled.div`
  position: relative;
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
  bottom: -15px;
  right: -25px;
  z-index: 1;
  cursor: pointer;
`;

const InputArea = styled.div`
  width: 335px;
  height: 50px;
  background-color: var(--colors-main);
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

const ButtonArea = styled.div`
  height: 100%;
  align-items: end;
`;

const SaveButton = styled.button`
  width: 335px;
  height: 60px;
  background-color: var(--colors-main);
  border-radius: 16px;
  font-size: var(--font-sizes-base);
  color: var(--colors-tertiary);
  cursor: pointer;
`;
