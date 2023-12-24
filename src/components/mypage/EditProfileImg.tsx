import '@pqina/pintura/pintura.css';
import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { imageState } from '@/atoms/atoms';
import { PinturaEditorModal } from '@pqina/react-pintura';
import { getEditorDefaults, createDefaultImageWriter } from '@pqina/pintura';
import locale_ko_KR from '@pqina/pintura/locale/ko_KR';
// _PINTURA IMPORTS
import Icon from '@/components/common/Icon';
import { EditProfileImgProps } from '@/types/types';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { FlexCenter, Column } from '@/styles/layout';
import { Cursor } from '@/styles/styles';
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

const EditProfileImg: React.FC<EditProfileImgProps> = ({ onImageSelect }) => {
  const [editorEnabled, setEditorEnabled] = useState(false);
  const [editorSrc, setEditorSrc] = useState<File>();
  const [imageUrl, setImageUrl] = useRecoilState(imageState);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = () => {
    if (!fileInputRef?.current?.files?.length) return;
    const file = fileInputRef?.current?.files[0];
    if (fileInputRef?.current?.files) {
      setEditorEnabled(true);
      setEditorSrc(file);
    }
  };

  const handleEditorHide = () => setEditorEnabled(false);

  const handleEditorProcess = ({ dest }: { dest: File }) => {
    const url = URL.createObjectURL(dest);
    setImageUrl(url);
    onImageSelect(dest);
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
    </>
  );
};

const Wrapper = styled.div`
  padding: 20px 0 40px 0;
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
const Edit = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  bottom: 9px;
  right: -2px;
  z-index: 1;
`;

export default EditProfileImg;
