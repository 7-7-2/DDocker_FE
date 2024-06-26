import { useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/common/Button';
import ImgCropper from '@/components/common/ImgCropper';
import InputAboutMe from '@/components/mypage/InputAboutMe';
import CheckNickname from '@/components/start/CheckNickname';
import EditProfileImg from '@/components/mypage/EditProfileImg';

import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useImageCropper } from '@/hooks/post/useImageCropper';
import { useCompressImage } from '@/hooks/useCompressImage';
import { useCancelSignUp } from '@/hooks/start/useCancelSignUp';

import { TEXT } from '@/constants/texts';
import { BUTTON_TEXTS } from '@/constants/common';
import { INITIAL_FORM_TEXTS } from '@/constants/start';
import { CheckNicknameState, authState } from '@/atoms/atoms';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Column } from '@/styles/layout';
import {
  DefaultBtn,
  DisabledBtn,
  Regular,
  Semibold,
  PrfileTitle,
  MarginT28,
  StartPageBtnContainer
} from '@/styles/styles';

const { message } = INITIAL_FORM_TEXTS;

const InitialForm = () => {
  useComposeHeader(false, '기본정보', 'close');
  useCancelSignUp();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [userInit, setUserInit] = useRecoilState(authState);
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
    inputRef.current?.value &&
      setUserInit({ ...userInit, aboutMe: inputRef.current?.value || null });
    navigate('/start/3', { state: imageFile });
  };

  return (
    <div className={Column}>
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
      <InputAboutMeContainer>
        <InputAboutMe
          inputRef={inputRef}
          Icon={false}
        />
      </InputAboutMeContainer>

      <div className={StartPageBtnContainer}>
        <Button
          text={BUTTON_TEXTS.next}
          onClick={
            userInit?.nickname && isApproval
              ? handleNextPage
              : () => navigate('/start/2')
          }
          className={
            userInit?.nickname && isApproval
              ? cx(DefaultBtn)
              : cx(DefaultBtn, DisabledBtn)
          }
        />
      </div>
    </div>
  );
};

const ProfileContainer = styled.div`
  margin: 50px 36px;
`;

const InputAboutMeContainer = styled.div`
  margin-bottom: 100px;
`;

export default InitialForm;
