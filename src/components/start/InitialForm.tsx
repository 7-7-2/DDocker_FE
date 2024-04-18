import { useRecoilValue } from 'recoil';
import { CheckNicknameState, authState } from '@/atoms/atoms';
import Button from '@/components/common/Button';
import EditProfileImg from '@/components/mypage/EditProfileImg';
import SelectGender from '@/components/start/SelectGender';
import CheckNickname from '@/components/start/CheckNickname';
import { INITIAL_FORM_TEXTS } from '@/constants/start';
import { BUTTON_TEXTS } from '@/constants/common';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useNavigate } from 'react-router-dom';

import { styled } from 'styled-system/jsx';
import { Column } from '@/styles/layout';
import {
  DefaultBtn,
  DisabledBtn,
  Regular,
  Semibold,
  StartPageContainer,
  PrfileTitle,
  MarginT28
} from '@/styles/styles';
import { cx } from 'styled-system/css';
import ImgCropper from '@/components/common/ImgCropper';
import { TEXT } from '@/constants/texts';
import { useImageCropper } from '@/hooks/post/useImageCropper';
import { useCompressImage } from '@/hooks/useCompressImage';

const { message } = INITIAL_FORM_TEXTS;

const InitialForm = () => {
  const navigate = useNavigate();

  useComposeHeader(false, '기본정보', 'close');
  const user = useRecoilValue(authState);
  const isApproval = useRecoilValue(CheckNicknameState);

  const {
    imageUrl,
    setImageUrl,
    setImageFile,
    imageFile,
    setCropperEnabled,
    cropperEnabled
  } = useImageCropper();
  const { compressImage, isLoading } = useCompressImage();

  const cropperProps = {
    imageUrl,
    setImageUrl,
    setImageFile,
    cropperEnabled,
    setCropperEnabled,
    compressImage,
    isLoading
  };

  const editProps = {
    imageUrl,
    setImageUrl,
    setCropperEnabled
  };

  const handleNextPage = () => {
    navigate('/start/3', { state: imageFile });
  };

  return (
    <div className={Column}>
      <div className={StartPageContainer}>
        <div className={cx(Regular, PrfileTitle, MarginT28)}>
          {message.first}
          <br />
          <span className={Semibold}>{message.profile}</span>
          {message.second}
        </div>
        <ProfileContainer>
          <EditProfileImg {...editProps} />
          <ImgCropper
            stencilType={TEXT.circle}
            aspectRatio={1}
            {...cropperProps}
          />
        </ProfileContainer>
        <CheckNickname />
        <SelectGender />
      </div>
      <Button
        text={BUTTON_TEXTS.next}
        onTouchEnd={
          user?.nickname && isApproval && user?.gender
            ? handleNextPage
            : () => navigate('/start/2')
        }
        className={
          user?.nickname && isApproval && user?.gender
            ? DefaultBtn
            : cx(DefaultBtn, DisabledBtn)
        }
      />
    </div>
  );
};

const ProfileContainer = styled.div`
  margin: 50px 36px;
`;

export default InitialForm;
