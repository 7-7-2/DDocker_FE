import Icon from '@/components/common/Icon';
import { FlexCenter } from '@/styles/layout';
import { MarginT6 } from '@/styles/styles';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { styled } from 'styled-system/jsx';
import { ImgRegisterProps } from '@/types/types';
import { useImageCropper } from '@/hooks/post/useImageCropper';

const ImgRegister = ({
  setImageUrl,
  imageUrl,
  setCropperEnabled
}: ImgRegisterProps) => {
  const { fileInputRef } = useImageCropper();

  const resetImage = () => {
    setImageUrl('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (!files) return;
    const url = URL.createObjectURL(files[0]);
    setImageUrl(url);
    setCropperEnabled(true);
  };

  return (
    <div className={MarginT6}>
      {imageUrl && (
        <PostImgContainer>
          <img
            src={imageUrl}
            alt="posted coffee"
            onTouchEnd={resetImage}
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
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </RegistPhoto>
      )}
    </div>
  );
};

const RegistPhoto = styled.label`
  width: 106px;
  height: 106px;
  border-radius: 10px;
  background: var(--colors-tertiary);
`;

const PostImgContainer = styled.div`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  overflow: hidden;
`;

export default ImgRegister;
