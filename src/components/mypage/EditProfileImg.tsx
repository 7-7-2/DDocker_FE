import Icon from '@/components/common/Icon';
import { EditProfileImgProps } from '@/types/types';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { FlexCenter, Column } from '@/styles/layout';
import { Cursor } from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import { useImageCropper } from '@/hooks/post/useImageCropper';

const EditProfileImg = ({
  profileImg,
  setImageUrl,
  imageUrl,
  setCropperEnabled
}: EditProfileImgProps) => {
  const { fileInputRef } = useImageCropper();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) return;
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setCropperEnabled(true);
  };

  return (
    <>
      <Wrapper className={cx(FlexCenter, Column)}>
        <ImgContainer>
          {(profileImg || imageUrl) && (
            <ImgRound>
              <Img
                src={imageUrl ? imageUrl : profileImg}
                alt="profile image"
              />
            </ImgRound>
          )}
          {!profileImg && !imageUrl && (
            <Icon {...iconPropsGenerator('user', '100')} />
          )}
          <Edit className={Cursor}>
            <label>
              <Icon {...iconPropsGenerator('edit-photo', '32')} />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
            </label>
          </Edit>
        </ImgContainer>
      </Wrapper>
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
const Img = styled.img`
  width: 100px;
  height: 100px;
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
