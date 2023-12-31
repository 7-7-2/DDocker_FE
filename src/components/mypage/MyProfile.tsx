import EditProfileImg from '@/components/mypage/EditProfileImg';
import CheckNickname from '@/components/start/CheckNickname';
import { TEXT } from '@/constants/texts';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useImgSubmit } from '@/hooks/useImgSubmit';
import { FlexCenter, Justify } from '@/styles/layout';
import {
  Cursor,
  SumType,
  Border16,
  HomeRegistContainer
} from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const MyProfile = () => {
  useComposeHeader(false, '프로필 수정', 'close');

  const handleExitedUser = () => {
    console.log('회원 탈퇴');
  };

  const { handleFormSubmit, setImageUrl } = useImgSubmit();

  const handleImageSelect = (selectedImage: File) => {
    setImageUrl(URL.createObjectURL(selectedImage));
  };

  return (
    <>
      <EditProfileImg onImageSelect={handleImageSelect} />
      <CheckNickname />
      <ExitButton
        className={cx(Cursor, SumType)}
        onTouchEnd={handleExitedUser}>
        {TEXT.exitButtonText}
      </ExitButton>
      <ButtonArea className={Justify}>
        <SaveButton
          className={cx(FlexCenter, Cursor, Border16, HomeRegistContainer)}
          onTouchEnd={handleFormSubmit}>
          {TEXT.saveButton}
        </SaveButton>
      </ButtonArea>
    </>
  );
};

const ExitButton = styled.span`
  padding: 16px 0;
  display: inline-block;
  text-decoration-line: underline;
`;
const ButtonArea = styled.div`
  width: auto;
  height: calc(100% - 307px);
  align-items: end;
`;
const SaveButton = styled.button`
  width: 100%;
  height: 60px;
  background-color: var(--colors-main);
  color: #fff !important;
`;
export default MyProfile;
