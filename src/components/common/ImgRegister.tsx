import Icon from '@/components/common/Icon';
import { FlexCenter } from '@/styles/layout';
import { MarginT6, Spinner } from '@/styles/styles';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { styled } from 'styled-system/jsx';
import { ImgRegisterProps } from '@/types/types';
import { useImageCropper } from '@/hooks/post/useImageCropper';

const ImgRegister = ({
  setImageUrl,
  imageUrl,
  setCropperEnabled,
  isLoading: isLoadingImg
}: ImgRegisterProps) => {
  const { fileInputRef, setImageFile, imageFile } = useImageCropper();

  const resetImage = () => {
    setImageUrl('');
    setImageFile(undefined);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) return;
    setImageFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setCropperEnabled(true);
  };

  return (
    <div className={MarginT6}>
      {imageUrl && !isLoadingImg && (
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
          {!imageFile && !isLoadingImg && (
            <>
              <Icon {...iconPropsGenerator('regist-photo', '24')} />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </>
          )}
          {imageFile && <div className={Spinner} />}
        </RegistPhoto>
      )}
    </div>
  );
};

const RegistPhoto = styled.label`
  max-width: 100%;
  max-height: 100%;
  aspect-ratio: 1;
  border-radius: 10px;
  background: var(--colors-tertiary);
`;

const PostImgContainer = styled.div`
  max-width: 100%;
  height: auto;
  aspect-ratio: 1;
  border-radius: 10px;
  overflow: hidden;
`;

export default ImgRegister;
