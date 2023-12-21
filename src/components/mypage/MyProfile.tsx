import { useState, useRef } from 'react';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { firestore, storage } from '@/firebase.config';
import { useStorage } from '@/api/profile';
import Icon from '@/components/common/Icon';
import CheckNickname from '@/components/start/CheckNickname';
import { TEXT } from '@/constants/texts';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useFileReader } from '@/hooks/useFileReader';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { FlexCenter, MarginAuto, Flex, Justify, Column } from '@/styles/layout';
import { Cursor, LineH18, TextGray, Border16, Medium } from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const MyProfile = () => {
  useComposeHeader(false, '프로필 수정', 'close');

  const { uploadFile } = useStorage();
  const { readFile } = useFileReader();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleExitedUser = () => {
    console.log('회원 탈퇴');
  };

  const handleLoadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }
    const file = e.target.files[0];
    const base64 = await readFile(file);

    if (base64) {
      setProfileImage(base64);
    }
  };

  const handleImageChange = async () => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      const fileInput = inputRef.current;

      if (fileInput?.files?.length) {
        const file = fileInput.files[0];

        const collectionRef = collection(firestore, 'users');
        const userDocRef = doc(collectionRef, userId);

        // storage 에 저장하는 이미지
        const filePath = `users/${userId}/profileImage.jpg`;
        await uploadFile(filePath, file);

        // 이미지가 저장되어있는 storage 를 참조하여
        const storageRef = ref(storage, `users/${userId}/profileImage.jpg`);
        // 해당 이미지를 다운로드
        const downloadURL = await getDownloadURL(storageRef);

        // 기존에 존재하는 collection 을 업데이트
        await updateDoc(userDocRef, {
          'user.profileUrl': downloadURL
        });

        console.log('File uploaded successfully!');
      }
    }
  };

  return (
    <>
      <Wrapper className={cx(FlexCenter, Column)}>
        <Container className={cx(Flex, MarginAuto)}>
          <Box className={cx(FlexCenter, MarginAuto)}>
            <div>
              {profileImage ? (
                <ImgContainer
                  src={profileImage}
                  alt="Profile"
                />
              ) : (
                <Icon {...iconPropsGenerator('user', '100')} />
              )}
            </div>
            <Edit className={Cursor}>
              <label>
                <Icon {...iconPropsGenerator('edit-photo', '32')} />
                <InputBtn
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={handleLoadImage}
                />
              </label>
            </Edit>
          </Box>
        </Container>
      </Wrapper>
      <CheckNickname />

      <ExitButton
        className={cx(Cursor, LineH18, TextGray)}
        onTouchEnd={handleExitedUser}>
        {TEXT.exitButtonText}
      </ExitButton>

      <ButtonArea className={Justify}>
        <SaveButton
          className={cx(FlexCenter, Cursor, Border16, Medium)}
          onTouchEnd={handleImageChange}>
          {TEXT.saveButton}
        </SaveButton>
      </ButtonArea>
    </>
  );
};

const Wrapper = styled.div`
  padding: 20px 0 40px;
  gap: 40px;
`;
const Container = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;
const Box = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
`;
const ImgContainer = styled.img`
  width: auto;
  height: auto;
  border-radius: 50%;
`;
const Edit = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  bottom: 5px;
  right: 0px;
  z-index: 1;
`;
const InputBtn = styled.input`
  display: none;
`;
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
