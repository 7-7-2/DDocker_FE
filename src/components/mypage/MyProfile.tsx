import { MouseEventHandler, Suspense, lazy, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import InputAboutMe from '@/components/mypage/InputAboutMe';
import CheckNickname from '@/components/start/CheckNickname';
import PrivateAccountToggle from '@/components/mypage/PrivateAccountToggle';
import FavoriteBrandEditer from '@/components/mypage/FavoriteBrandEditer';
import ProfileImgEditer from '@/components/mypage/ProfileImgEditer';
const ConfirmDeleteUser = lazy(
  () => import('@/components/post/overlay/ConfirmDeleteUser')
);

import { MYPAGE_TEXTS } from '@/constants/profile';
import { BUTTON_TEXTS } from '@/constants/common';
import { editProfile, getMyInfo } from '@/api/user';
import { authState, cahceImgState } from '@/atoms/atoms';

import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { useHandleAuth } from '@/hooks/MyPage/useHandleAuth';
import { useShowFooter } from '@/hooks/useShowFooter';
import { useEditProfileImg } from '@/hooks/MyPage/useEditProfileImg';

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

const { btn } = MYPAGE_TEXTS;

const MyProfile = () => {
  useShowFooter(false);
  // header 수정 예정
  useComposeHeader(false, '내 프로필 수정', 'close');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const { userData, userId } = useCachedUserInfo();
  const [selectedFavBrand, selectFavBrand] = useState(userData.brand);
  const { nickname: editNickname, visibility } = useRecoilValue(authState);
  const { isModal, handleDeleteAccount, handleSignOut } = useHandleAuth();
  const setCacheState = useSetRecoilState(cahceImgState);

  const {
    cropperProps,
    editProps,
    storagePath,
    isDeleted,
    handleDeleteImg,
    handleProfileImg
  } = useEditProfileImg();

  const goToMyProfile = (status = 0) =>
    navigate(`/profile/${userId}`, { state: status });

  const selectbrand: MouseEventHandler<HTMLButtonElement> = e => {
    selectFavBrand(e.currentTarget.value);
  };

  const handleEditProfileData = async (path?: string | null) => {
    const currentBio = inputRef.current?.value;
    const currentPath = path === null ? null : (path as string);
    return {
      ...(userData !== currentBio && { bio: currentBio }),
      ...(editNickname && { nickname: editNickname }),
      ...(path !== undefined && { profileUrl: currentPath }),
      ...(userData.brand !== selectedFavBrand && { brand: selectedFavBrand }),
      ...(visibility !== userData.visibility && { visibility: visibility })
    };
  };

  const handlClickBtn = () => async () => {
    const imgState = await handleProfileImg();
    console.log(imgState, storagePath);
    const editData = imgState
      ? await handleEditProfileData(storagePath)
      : isDeleted
        ? await handleEditProfileData(null)
        : await handleEditProfileData();
    await editProfile(editData);
    await getMyInfo();
    ((imgState && !isDeleted) || isDeleted) && setCacheState(false);
    return imgState ? goToMyProfile(imgState) : goToMyProfile();
  };

  return (
    <>
      {isModal && (
        <Suspense>
          <ConfirmDeleteUser />
        </Suspense>
      )}
      <>
        <ProfileEditer className={Column}>
          <ProfileImgEditer
            cropperProps={cropperProps}
            editProps={editProps}
            handleDeleteImg={handleDeleteImg}
            initProfileImg={isDeleted ? undefined : userData?.profileUrl}
          />
          <CheckNickname userNickname={userData && userData.nickname} />
          <InputAboutMe
            inputRef={inputRef}
            userAboutMe={userData && userData.aboutMe}
            icon
          />
          <FavoriteBrandEditer
            userBrand={userData && userData.brand}
            selectedFavBrand={selectedFavBrand}
            selectbrand={selectbrand}
          />
          <div className={SectionDivier} />
          <PrivateAccountToggle />
        </ProfileEditer>
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
          onClick={handlClickBtn()}>
          {BUTTON_TEXTS.save}
        </SaveButton>
      </ButtonArea>
    </>
  );
};

const ProfileEditer = styled.div`
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
