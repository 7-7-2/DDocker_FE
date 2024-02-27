import '@pqina/pintura/pintura.css';
import { useRef, useState } from 'react';
import { PinturaEditorModal } from '@pqina/react-pintura';
import { getEditorDefaults } from '@pqina/pintura';
import locale_ko_KR from '@pqina/pintura/locale/ko_KR';
// _PINTURA

import { useRecoilState, useRecoilValue } from 'recoil';
import { Input } from '@/components/common/Input';
import CoffeeOptionSelection from '@/components/common/CoffeeOptionSelection';
import CoffeeMenuSelection from '@/components/home/CoffeeMenuSelection';
import RegisterLabel from '@/components/post/RegisterLabel';
import { BUTTON_TEXTS, INPUT_TEXTS, LABEL_TEXTS } from '@/constants/common';
import Icon from '@/components/common/Icon';
import Button from '@/components/common/Button';

import { registPostState, useInputState } from '@/atoms/atoms';
import { getTodayCoffeeInfo, setPostRegist } from '@/api/post';
import { useShowFooter } from '@/hooks/useShowFooter';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { FlexCenter } from '@/styles/layout';
import { DefaultBtn } from '@/styles/styles';

const editorDefaults = getEditorDefaults({
  cropImageSelectionCornerStyle: 'hook',
  locale: {
    ...locale_ko_KR
  }
});

const PostRegister = () => {
  useShowFooter(false);
  const inputState = useRecoilValue(useInputState);
  const [registInfo, setRegistInfo] = useRecoilState(registPostState);

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

  const newRegistData = {
    ...registInfo,
    post_title: inputState,
    photo: imageUrl
  };

  const navigateToDetail = useNavigateTo('/post/1');

  const clickRegisterBtn = async () => {
    setRegistInfo(newRegistData);
    await setPostRegist(newRegistData);
    await getTodayCoffeeInfo();
  };

  return (
    <>
      <Container>
        <CoffeeMenuSelection />
        <CoffeeOptionSelection />
        <RegisterLabel label={LABEL_TEXTS.title} />
        <div className={MarginTop6}>
          <Input type={INPUT_TEXTS.type.title.typeName} />
        </div>
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
