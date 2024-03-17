import '@pqina/pintura/pintura.css';
import { useRef, useState } from 'react';
import { PinturaEditorModal } from '@pqina/react-pintura';
import { getEditorDefaults } from '@pqina/pintura';
import locale_ko_KR from '@pqina/pintura/locale/ko_KR';
// _PINTURA

import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import CoffeeOptionSelection from '@/components/common/CoffeeOptionSelection';
import CoffeeMenuSelection from '@/components/home/CoffeeMenuSelection';
import RegisterLabel from '@/components/post/RegisterLabel';
import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import { BUTTON_TEXTS, LABEL_TEXTS } from '@/constants/common';

import { caffeineFilterState, registPostState } from '@/atoms/atoms';
import { getUserInfo } from '@/api/user';
import { getTodayCoffeeInfo, setPostRegist } from '@/api/post';
import { useShowFooter } from '@/hooks/useShowFooter';
import useResetSelectedCoffee from '@/hooks/useResetSelectedCoffee';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { FlexCenter } from '@/styles/layout';
import { DefaultBtn } from '@/styles/styles';
import PostInputTitle from '@/components/post/PostInputTitle';

const editorDefaults = getEditorDefaults({
  cropImageSelectionCornerStyle: 'hook',
  locale: {
    ...locale_ko_KR
  }
});

const PostRegister = () => {
  useShowFooter(false);
  const { caffeine } = useRecoilValue(caffeineFilterState);
  const registInfo = useRecoilValue(registPostState);
  const resetSelectedCoffee = useResetSelectedCoffee();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  // _PINTURA
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

  const handleRegistData = async (postTitle: string | undefined) => {
    return {
      ...registInfo,
      caffeine: caffeine,
      post_title: postTitle,
      photo: imageUrl
    };
  };

  const updateData = async () => {
    await getTodayCoffeeInfo();
    await getUserInfo(0);
  };

  const clickRegisterBtn = async () => {
    const newRegistData = await handleRegistData(inputRef.current?.value);
    const postId = await setPostRegist(newRegistData);
    await updateData();
    resetSelectedCoffee();
    navigate(`/post/${postId}`);
  };

  return (
    <>
      <Container>
        <CoffeeMenuSelection />
        <CoffeeOptionSelection />
        <RegisterLabel label={LABEL_TEXTS.title} />
        <PostInputTitle inputRef={inputRef} />
        <RegisterLabel
          label={LABEL_TEXTS.photo}
          essential
        />
        <div className={MarginTop6}>
          {imageUrl && (
            <PostImgContainer>
              <img
                src={imageUrl}
                alt="posted coffee"
                onTouchEnd={() => {
                  setImageUrl('');
                }}
              />
            </PostImgContainer>
          )}
          {!imageUrl && (
            <RegistPhoto className={FlexCenter}>
              <Icon {...iconPropsGenerator('regist-photo', '24')} />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                style={{ display: 'none' }}
              />
            </RegistPhoto>
          )}
        </div>
      </Container>

      {editorEnabled && (
        <PinturaEditorModal
          {...editorDefaults}
          src={editorSrc}
          imageCropAspectRatio={1.378}
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

      <Button
        text={BUTTON_TEXTS.regist}
        onTouchEnd={clickRegisterBtn}
        className={cx(DefaultBtn, BtnContainer)}
      />
    </>
  );
};

const MarginTop6 = css`
  margin-top: 6px;
`;

const RegistPhoto = styled.label`
  width: 106px;
  height: 106px;
  border-radius: 10px;
  background: var(--colors-tertiary);
`;

const Container = styled.div`
  padding-bottom: 22px;
  overflow-x: visible;
  overflow-y: auto;
`;

const BtnContainer = css`
  position: sticky;
  bottom: 0;
`;

const PostImgContainer = styled.div`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  overflow: hidden;
`;

export default PostRegister;
