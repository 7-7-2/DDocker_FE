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
    setImageFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) return;
    setImageFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setCropperEnabled(true);
  };

  return (
    <>
      {imageUrl && !isLoadingImg && (
        <PostImgContainer>
          <Img
            src={imageUrl}
            alt="posted coffee"
            onClick={resetImage}
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
    </>
  );
};

const RegistPhoto = styled.label`
  width: 106px;
  height: 106px;
  aspect-ratio: 1;
  border-radius: 10px;
  background: var(--colors-tertiary);
`;

const PostImgContainer = styled.div`
  width: 106px;
  height: 106px;
  height: auto;
  aspect-ratio: 1;
  border-radius: 10px;
  overflow: hidden;
`;

const Img = styled.img`
  width: 106px;
  height: 106px;
  object-fit: 'cover';
`;

export default ImgRegister;
