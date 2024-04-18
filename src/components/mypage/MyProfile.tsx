import { useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import InputAboutMe from '@/components/mypage/InputAboutMe';
import EditProfileImg from '@/components/mypage/EditProfileImg';
import CheckNickname from '@/components/start/CheckNickname';
import { TEXT } from '@/constants/texts';
import { editProfile, getMyInfo } from '@/api/user';
import { authState, cahceImgState } from '@/atoms/atoms';
import { useComposeHeader } from '@/hooks/useComposeHeader';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import {
  Cursor,
  SumType,
  Border16,
  HomeRegistContainer
} from '@/styles/styles';
import { FlexCenter, Justify } from '@/styles/layout';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';

import { useImageCropper } from '@/hooks/post/useImageCropper';
import ImgCropper from '@/components/common/ImgCropper';
import { useCloudStorage } from '@/hooks/useCloudStorage';
import { useNavigate } from 'react-router-dom';
import { useCompressImage } from '@/hooks/useCompressImage';

const imagePath = import.meta.env.VITE_R2_USER_IMAGE_PATH;

const MyProfile = () => {
  useComposeHeader(false, '프로필 수정', 'close');
  const { userData, userId } = useCachedUserInfo();
  const { nickname: editNickname } = useRecoilValue(authState);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const navigate = useNavigate();
  const goToMyProfile = (status = 0) =>
    navigate(`/profile/${userId}`, { state: status });
  const setCacheState = useSetRecoilState(cahceImgState);

  const {
    imageUrl,
    setImageUrl,
    setImageFile,
    imageFile,
    setCropperEnabled,
    cropperEnabled
  } = useImageCropper();
  const { compressImage, isLoading } = useCompressImage();

  const handleExitedUser = () => {
    // 추후 진행하겠습니다...
    console.log('회원 탈퇴');
  };

  const { uploadStorage } = useCloudStorage();

  const storagePath = `${imagePath}%2F${userId}`;

  const handleEditProfileData = async (path: string) => {
    const editData: {}[] = [];

    userData.aboutMe !== inputRef.current?.value &&
      editData.push({ aboutMe: inputRef.current?.value });
    editNickname && editData.push({ nickname: editNickname });
    editData.push({ proFileUrl: path });
    return Object.assign({}, ...editData);
  };

  const handlClickBtn =
    (route: string, file: File | null, path: string) => async () => {
      const uploaded = route && file && (await uploadStorage(route, file));
      const editData = await handleEditProfileData(path);
      await editProfile(editData);
      await getMyInfo();
      uploaded && setCacheState(false);
      return uploaded ? goToMyProfile(uploaded) : goToMyProfile();
    };

  const cropperProps = {
    setImageFile,
    cropperEnabled,
    compressImage,
    isLoading
  };

  const editProps = {
    imageUrl,
    setImageUrl,
    setCropperEnabled
  };

  return (
    <>
      <EditProfileImg
        profileImg={userData && userData.profileUrl}
        {...editProps}
      />
      <ImgCropper
        stencilType={TEXT.circle}
        aspectRatio={1}
        {...cropperProps}
        {...editProps}
      />
      <CheckNickname userNickname={userData && userData.nickname} />
      <InputAboutMe
        inputRef={inputRef}
        userAboutMe={userData && userData.aboutMe}
      />
      <ExitButton
        className={cx(Cursor, SumType)}
        onTouchEnd={handleExitedUser}>
        {TEXT.exitButtonText}
      </ExitButton>
      <ButtonArea className={Justify}>
        <SaveButton
          className={cx(FlexCenter, Cursor, Border16, HomeRegistContainer)}
          onTouchEnd={handlClickBtn(
            `user/${userId}`,
            imageFile ? imageFile : null,
            storagePath
          )}>
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
  height: calc(100% - 487px);
  align-items: end;
`;

const SaveButton = styled.button`
  width: 100%;
  height: 60px;
  background-color: var(--colors-main);
  color: #fff !important;
`;
export default MyProfile;
