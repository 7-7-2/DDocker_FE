import Icon from '@/components/common/Icon';

import { useImageCropper } from '@/hooks/post/useImageCropper';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { ImgRegisterProps } from '@/types/types';

import { styled } from 'styled-system/jsx';
import { Spinner } from '@/styles/styles';
import { Flex, FlexCenter } from '@/styles/layout';

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
          <BtnItem onClick={resetImage}>
            <Icon {...iconPropsGenerator('regist-photo-delete', '26')} />
          </BtnItem>
          <ImgContainer>
            <EditBtn
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <Img
              src={imageUrl}
              alt="posted coffee"
            />
          </ImgContainer>
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
  height: 106px;
  width: 106px;
  aspect-ratio: 1;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

const BtnItem = styled.div`
  position: absolute;
  right: 6px;
  top: 6px;
  border-radius: 50%;
  z-index: var(--z-index-contents-btn);
`;

const ImgContainer = styled.div`
  position: relative;
`;

const EditBtn = styled.input`
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0;
`;

const Img = styled.img`
  height: 106px;
  width: 106px;
  object-fit: 'cover';
`;

export default ImgRegister;
