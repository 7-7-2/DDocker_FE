import Icon from '@/components/common/Icon';
import { TEXT } from '@/constants/texts';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { FlexCenter, MarginAuto, Flex, Justify, Column } from '@/styles/layout';
import { Cursor, LineH18, TextGray, Border16, Medium } from '@/styles/styles';
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
      <Wrapper className={cx(FlexCenter, Column)}>
        <Container className={cx(Flex, MarginAuto)}>
          <Box className={cx(FlexCenter, MarginAuto)}>
            <div>
              <Icon {...iconPropsGenerator('user', '100')} />
            </div>
            <Edit className={Cursor}>
              <Icon {...iconPropsGenerator('edit-photo', '32')} />
            </Edit>
          </Box>
        </Container>
        <InputArea />
      </Wrapper>

      <ExitButton
        className={cx(Cursor, LineH18, TextGray)}
        onTouchEnd={handleExitedUser}>
        {TEXT.exitButtonText}
      </ExitButton>

      <ButtonArea className={Justify}>
        <SaveButton
          className={cx(FlexCenter, Cursor, Border16, Medium)}
          onTouchEnd={handleFormSubmit}>
          {TEXT.saveButton}
        </SaveButton>
      </ButtonArea>
    </>
  );
};

const Wrapper = styled.div`
  margin-top: 20px;
  gap: 80px;
`;
const Container = styled.div`
  position: relative;
  width: 94px;
  height: 94px;
`;
const Box = styled.div`
  width: 54px;
  height: 54px;
  position: relative;
`;
const Edit = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  bottom: -15px;
  right: -25px;
  z-index: 1;
`;
const InputArea = styled.div`
  width: 335px;
  height: 50px;
  background-color: var(--colors-main);
`;
const ExitButton = styled.span`
  font-size: var(--font--sizes-sm);
  margin: 16px 20px;
  display: inline-block;
  text-decoration-line: underline;
`;
const ButtonArea = styled.div`
  height: 100%;
  align-items: end;
`;
const SaveButton = styled.button`
  width: 335px;
  height: 60px;
  background-color: var(--colors-main);
  font-size: var(--font-sizes-base);
  color: #fff;
`;

export default MyProfile;
