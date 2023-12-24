import { useEffect, useState } from 'react';
import {
  getStorageImg,
  getUserDocRef,
  setProfileImg,
  setStorageImg
} from '@/api/profile';
import EditProfileImg from '@/components/mypage/EditProfileImg';
import CheckNickname from '@/components/start/CheckNickname';
import { TEXT } from '@/constants/texts';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { FlexCenter, Justify } from '@/styles/layout';
import { Cursor, LineH18, TextGray, Border16, Medium } from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import { CachedData } from '@/types/types';
import useGetCacheData from '@/hooks/useGetCacheData';
import { useRecoilState } from 'recoil';
import { imageState } from '@/atoms/atoms';

const MyProfile = () => {
  useComposeHeader(false, '프로필 수정', 'close');

  const handleExitedUser = () => {
    console.log('회원 탈퇴');
  };

  const [cachedData, setCachedData] = useState<CachedData>();

  const getCachedUserInfo = async () => {
    const data = await useGetCacheData('user', '/userId');
    setCachedData(data);
  };

  const userId = cachedData?.cacheData;

  useEffect(() => {
    getCachedUserInfo();
  }, []);

  const [imageUrl, setImageUrl] = useRecoilState(imageState);

  const handleFormSubmit = async () => {
    if (userId && imageUrl) {
      try {
        const userDocRef = await getUserDocRef();
        const filePath = `users/${userId}/profileImage.jpg`;

        const response = await fetch(imageUrl);
        const blob = await response.blob();

        const file = new File([blob], 'profileImage.jpg', {
          type: 'image/jpeg'
        });
        await setStorageImg(filePath, file);
        await getStorageImg(filePath);
        await setProfileImg(userDocRef, filePath);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleImageSelect = (selectedImage: File) => {
    setImageUrl(URL.createObjectURL(selectedImage));
  };

  return (
    <>
      <EditProfileImg onImageSelect={handleImageSelect} />
      <CheckNickname />
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

const ExitButton = styled.span`
  font-size: var(--font--sizes-sm);
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
  font-size: var(--font-sizes-base);
  color: #fff;
`;
export default MyProfile;
