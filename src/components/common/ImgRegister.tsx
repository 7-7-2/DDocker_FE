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
          <ImgEditBtnIcons className={Flex}>
            <BtnItem>
              <Icon {...iconPropsGenerator('regist-photo-change', '40')} />
              <EditBtn
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </BtnItem>
            <BtnItem onClick={resetImage}>
              <Icon {...iconPropsGenerator('regist-photo-delete', '40')} />
            </BtnItem>
          </ImgEditBtnIcons>
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
  height: 100%;
  aspect-ratio: 1;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

const ImgEditBtnIcons = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
  z-index: 3;
  gap: 10px;
`;

const BtnItem = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const EditBtn = styled.input`
  position: absolute;
  opacity: 0;
  top: 0;
  height: 100%;
  width: 100%;
  border-radius: 50%;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  object-fit: 'cover';
`;

export default ImgRegister;
