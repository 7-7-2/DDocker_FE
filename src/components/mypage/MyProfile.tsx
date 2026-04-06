import { Suspense, lazy, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import InputAboutMe from '@/components/mypage/InputAboutMe';
import EditProfileImg from '@/components/mypage/EditProfileImg';
import CheckNickname from '@/components/start/CheckNickname';
import ImgCropper from '@/components/common/ImgCropper';
import PrivateAccountToggle from '@/components/mypage/PrivateAccountToggle';
import FavoriteBrandEditer from '@/components/mypage/FavoriteBrandEditer';

import { TEXT } from '@/constants/texts';
import { MYPAGE_TEXTS } from '@/constants/profile';
import { editProfile, getMyInfo } from '@/api/user';
import { authState, cahceImgState } from '@/atoms/atoms';

import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { useImageCropper } from '@/hooks/post/useImageCropper';
import { useCloudStorage } from '@/hooks/useCloudStorage';
import { useCompressImage } from '@/hooks/useCompressImage';
import { useHandleAuth } from '@/hooks/MyPage/useHandleAuth';
import { useShowFooter } from '@/hooks/useShowFooter';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import {
  Cursor,
  SumType,
  SectionDivier,
  TextUnderLine,
  Medium,
  BottomBtnContainer,
  RegistBtn,
  Semibold
} from '@/styles/styles';
import { Column } from '@/styles/layout';

const ConfirmDeleteUser = lazy(
  () => import('@/components/post/overlay/ConfirmDeleteUser')
);

const imagePath = import.meta.env.VITE_R2_USER_IMAGE_PATH;
const { btn } = MYPAGE_TEXTS;

const MyProfile = () => {
  useShowFooter(false);
  // header 수정 예정
  useComposeHeader(false, '내 프로필 수정', 'close');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const { userData, userId } = useCachedUserInfo();
  const { nickname: editNickname } = useRecoilValue(authState);
  const { isModal, handleDeleteAccount, handleSignOut } = useHandleAuth();
  const setCacheState = useSetRecoilState(cahceImgState);
  const goToMyProfile = (status = 0) =>
    navigate(`/profile/${userId}`, { state: status });

  const {
    imageUrl,
    setImageUrl,
    setImageFile,
    imageFile,
    setCropperEnabled,
    cropperEnabled
  } = useImageCropper();
  const { compressImage, isLoading } = useCompressImage();

  const { uploadStorage } = useCloudStorage();
  const storagePath = `${imagePath}%2F${userId}`;

  const handleEditProfileData = async (path?: string) => {
    const editData: {}[] = [];
    userData.aboutMe !== inputRef.current?.value &&
      editData.push({ aboutMe: inputRef.current?.value });
    editNickname && editData.push({ nickname: editNickname });
    path && editData.push({ proFileUrl: path });
    return Object.assign({}, ...editData);
  };

  const handlClickBtn =
    (dir: string, userId: string, file: File | null, path: string) => async () => {
      const uploaded = dir && file && (await uploadStorage(dir, userId, '', file));
      const editData = uploaded
        ? await handleEditProfileData(path)
        : await handleEditProfileData();
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
      {isModal && (
        <Suspense>
          <ConfirmDeleteUser />
        </Suspense>
      )}
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
        <ProfileTextEditer className={Column}>
          <CheckNickname userNickname={userData && userData.nickname} />
          <InputAboutMe
            inputRef={inputRef}
            userAboutMe={userData && userData.aboutMe}
          />
          <FavoriteBrandEditer userBrand={userData && userData.brand} />
          <div className={SectionDivier} />
          <PrivateAccountToggle />
        </ProfileTextEditer>
        <ExitButtonContainer className={cx(Column, Medium)}>
          {btn.map(item => (
            <ExitButton
              key={item}
              className={cx(Cursor, SumType, item === btn[1] && TextUnderLine)}
              onClick={item === btn[1] ? handleDeleteAccount : handleSignOut}>
              {item}
            </ExitButton>
          ))}
        </ExitButtonContainer>
      </>
      <ButtonArea className={BottomBtnContainer}>
        <SaveButton
          className={cx(RegistBtn, Semibold)}
          onClick={handlClickBtn(
            'user',
            userId,
            imageFile ? imageFile : null,
            storagePath
          )}>
          {TEXT.saveButton}
        </SaveButton>
      </ButtonArea>
    </>
  );
};

const ProfileTextEditer = styled.div`
  gap: 28px;
`;

const ExitButton = styled.span`
  display: inline-block;
  line-height: 22px;
`;

const ButtonArea = styled.div`
  background-color: #fff;
`;

const SaveButton = styled.button`
  background-color: var(--colors-main);
  color: #fff;
`;

const ExitButtonContainer = styled.div`
  gap: 18px;
  margin: 42px 0 92px;
  font-size: var(--font-sizes-sm);
  color: var(--colors-mid-grey);
`;

export default MyProfile;
