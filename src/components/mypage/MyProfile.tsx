import '@pqina/pintura/pintura.css';
import { useRef, useState } from 'react';
import { PinturaEditorModal } from '@pqina/react-pintura';
import { getEditorDefaults, createDefaultImageWriter } from '@pqina/pintura';
import locale_ko_KR from '@pqina/pintura/locale/ko_KR';
// _PINTURA IMPORTS
import { collection, doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { firestore, storage } from '@/firebase.config';
import { useStorage } from '@/api/profile';
import Icon from '@/components/common/Icon';
import CheckNickname from '@/components/start/CheckNickname';
import { TEXT } from '@/constants/texts';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { FlexCenter, Justify, Column } from '@/styles/layout';
import { Cursor, LineH18, TextGray, Border16, Medium } from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const editorDefaults = getEditorDefaults({
  cropImageSelectionCornerStyle: 'hook',
  locale: {
    ...locale_ko_KR
  },
  imageWriter: createDefaultImageWriter({
    targetSize: {
      width: 100,
      height: 100,
      fit: 'contain',
      upscale: true
    }
  })
});

const MyProfile = () => {
  useComposeHeader(false, '프로필 수정', 'close');

  const { uploadFile } = useStorage();

  const handleExitedUser = () => {
    console.log('회원 탈퇴');
  };

  const [editorEnabled, setEditorEnabled] = useState(false);
  const [editorSrc, setEditorSrc] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = () => {
    if (!fileInputRef?.current?.files?.length) return;
    if (fileInputRef?.current?.files) {
      setEditorEnabled(true);
      setEditorSrc(fileInputRef?.current?.files[0]);
    }
  };

  const handleEditorHide = () => setEditorEnabled(false);

  const handleEditorProcess = ({ dest }: { dest: File }) => {
    const url = URL.createObjectURL(dest);
    setImageUrl(url);
  };

  const handleFormSubmit = async () => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      const fileInput = fileInputRef.current;

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
      }
    }
  };

  return (
    <>
      <Wrapper className={cx(FlexCenter, Column)}>
        <ImgContainer>
          {imageUrl && (
            <ImgRound>
              <img
                src={imageUrl}
                alt="profile image"
              />
            </ImgRound>
          )}
          {!imageUrl && <Icon {...iconPropsGenerator('user', '100')} />}
          <Edit className={Cursor}>
            <label>
              <Icon {...iconPropsGenerator('edit-photo', '32')} />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                style={{ display: 'none' }}
              />
            </label>
          </Edit>
        </ImgContainer>
      </Wrapper>
      <CheckNickname />

      <ExitButton
        className={cx(Cursor, LineH18, TextGray)}
        onTouchEnd={handleExitedUser}>
        {TEXT.exitButtonText}
      </ExitButton>

      {editorEnabled && (
        <PinturaEditorModal
          {...editorDefaults}
          src={editorSrc}
          imageCropAspectRatio={1}
          onHide={handleEditorHide}
          onProcess={handleEditorProcess}
          willRenderCanvas={(shapes, state) => {
            const { utilVisibility, selectionRect, lineColor } = state;

            if (utilVisibility.crop <= 0) return shapes;

            const { x, y, width, height } = selectionRect;

            return {
              ...shapes,

              interfaceShapes: [
                {
                  x: x + width * 0.5,
                  y: y + height * 0.5,
                  rx: width * 0.5,
                  ry: height * 0.5,
                  opacity: utilVisibility.crop,
                  inverted: true,
                  backgroundColor: [0, 0, 0, 0.1],
                  strokeWidth: 0.4,
                  strokeColor: [...lineColor]
                },
                ...shapes.interfaceShapes
              ]
            };
          }}
        />
      )}

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

const Wrapper = styled.div`
  padding: 20px 0 40px;
  gap: 40px;
`;

const Edit = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  bottom: 9px;
  right: -2px;
  z-index: 1;
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

const ImgContainer = styled.div`
  position: relative;
`;
const ImgRound = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  overflow: hidden;
`;
export default MyProfile;
