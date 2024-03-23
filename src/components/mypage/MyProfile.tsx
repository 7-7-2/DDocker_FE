import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import InputAboutMe from '@/components/mypage/InputAboutMe';
import EditProfileImg from '@/components/mypage/EditProfileImg';
import CheckNickname from '@/components/start/CheckNickname';
import { TEXT } from '@/constants/texts';
import { AuthTypes } from '@/types/types';
import { editProfile, getUserInfo } from '@/api/user';
import { authState } from '@/atoms/atoms';
import useGetCacheData from '@/hooks/useGetCacheData';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useImgSubmit } from '@/hooks/useImgSubmit';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import {
  Cursor,
  SumType,
  Border16,
  HomeRegistContainer
} from '@/styles/styles';
import { FlexCenter, Justify } from '@/styles/layout';

const MyProfile = () => {
  useComposeHeader(false, '프로필 수정', 'close');
  const { nickname: editNickname } = useRecoilValue(authState);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const { data: userData } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => useGetCacheData('user', '/userInfo')
  });

  const userInfo: AuthTypes = userData && userData.cacheData.data;

  const handleExitedUser = () => {
    // 추후 진행하겠습니다...
    console.log('회원 탈퇴');
  };

  const {
    handleFormSubmit,
    setImageUrl,
    imageUrl: editImgUrl
  } = useImgSubmit();

  const handleImageSelect = (selectedImage: File) => {
    setImageUrl(URL.createObjectURL(selectedImage));
  };

  const handleEditProfileData = async () => {
    const editData: {}[] = [];

    userInfo.aboutMe !== inputRef.current?.value &&
      editData.push({ aboutMe: inputRef.current?.value });
    editNickname && editData.push({ nickname: editNickname });
    editImgUrl && editData.push({ proFileUrl: editImgUrl });

    return Object.assign({}, ...editData);
  };

  const handlClickBtn = async () => {
    // handleFormSubmit();
    const editData = await handleEditProfileData();
    await editProfile(editData);
    await getUserInfo(0);
  };

  return (
    <>
      <EditProfileImg
        onImageSelect={handleImageSelect}
        imageUrl={userInfo && userInfo.profileUrl}
      />
      <CheckNickname userNickname={userInfo && userInfo.nickname} />
      <InputAboutMe
        inputRef={inputRef}
        userAboutMe={userInfo && userInfo.aboutMe}
      />
      <ExitButton
        className={cx(Cursor, SumType)}
        onTouchEnd={handleExitedUser}>
        {TEXT.exitButtonText}
      </ExitButton>
      <ButtonArea className={Justify}>
        <SaveButton
          className={cx(FlexCenter, Cursor, Border16, HomeRegistContainer)}
          onTouchEnd={handlClickBtn}>
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
