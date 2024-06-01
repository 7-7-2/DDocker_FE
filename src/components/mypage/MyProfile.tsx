import { Suspense, lazy, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import InputAboutMe from '@/components/mypage/InputAboutMe';
import EditProfileImg from '@/components/mypage/EditProfileImg';
import CheckNickname from '@/components/start/CheckNickname';
import ImgCropper from '@/components/common/ImgCropper';

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

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import {
  Cursor,
  SumType,
  Border16,
  HomeRegistContainer
} from '@/styles/styles';
import { FlexCenter, Justify } from '@/styles/layout';

const ConfirmDeleteUser = lazy(
  () => import('@/components/post/overlay/ConfirmDeleteUser')
);

const imagePath = import.meta.env.VITE_R2_USER_IMAGE_PATH;
const { btn } = MYPAGE_TEXTS;

const MyProfile = () => {
  useComposeHeader(false, '프로필 수정', 'close');
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
    (route: string, file: File | null, path: string) => async () => {
      const uploaded = route && file && (await uploadStorage(route, file));
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
        <CheckNickname userNickname={userData && userData.nickname} />
        <InputAboutMe
          inputRef={inputRef}
          userAboutMe={userData && userData.aboutMe}
        />
        {btn.map(item => (
          <ExitButton
            key={item}
            className={cx(Cursor, SumType)}
            onClick={item === btn[0] ? handleDeleteAccount : handleSignOut}>
            {item}
          </ExitButton>
        ))}
      </>

      <ButtonArea className={Justify}>
        <SaveButton
          className={cx(FlexCenter, Cursor, Border16, HomeRegistContainer)}
          onClick={handlClickBtn(
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
  margin: 16px 6px 0 0;
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

const ClickNone = css`
  pointer-events: none;
`;

export default MyProfile;
