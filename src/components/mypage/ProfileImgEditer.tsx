import ImgCropper from '@/components/common/ImgCropper';
import EditProfileImg from '@/components/mypage/EditProfileImg';

import { ImageEditCropperProps, ImageEditProps } from '@/types/types';
import { BUTTON_TEXTS } from '@/constants/common';
import { TEXT } from '@/constants/texts';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Medium } from '@/styles/styles';
import { Align, Column } from '@/styles/layout';

const ProfileImgEditer = ({
  cropperProps,
  editProps,
  handleDeleteImg,
  initProfileImg
}: {
  cropperProps: ImageEditCropperProps;
  editProps: ImageEditProps;
  handleDeleteImg: () => void;
  initProfileImg: string | undefined;
}) => {
  return (
    <div className={cx(Align, Column)}>
      <EditProfileImg
        profileImg={initProfileImg}
        {...editProps}
      />
      <ImgCropper
        stencilType={TEXT.circle}
        aspectRatio={1}
        {...cropperProps}
        {...editProps}
      />
      <ImgDeleteBtn
        className={Medium}
        onClick={handleDeleteImg}>
        {BUTTON_TEXTS.imgDelete}
      </ImgDeleteBtn>
    </div>
  );
};
const ImgDeleteBtn = styled.button`
  font-size: var(--font-sizes-sm);
  color: var(--colors-mid-grey);
  margin-top: 16px;
`;

export default ProfileImgEditer;
