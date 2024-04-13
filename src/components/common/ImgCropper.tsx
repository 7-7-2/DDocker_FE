import { Cropper, CircleStencil, RectangleStencil } from 'react-mobile-cropper';
import 'react-mobile-cropper/dist/style.css';
import { FlexCenter } from '@/styles/layout';
import { useImageCropper } from '@/hooks/post/useImageCropper';
import { css, cx } from 'styled-system/css';
import { TEXT } from '@/constants/texts';
import { ImgCropperProps } from '@/types/types';
import { useCompressImage } from '@/hooks/useCompressImage';

const { complete, circle, rectangle } = TEXT;

const ImgCropper = ({
  stencilType = rectangle,
  aspectRatio,
  setImageFile,
  imageUrl,
  setImageUrl,
  setCropperEnabled,
  cropperEnabled
}: ImgCropperProps) => {
  const circleType = {
    stencilComponent: stencilType === circle ? CircleStencil : RectangleStencil
  };
  const stencilProps = {
    grid: true,
    movable: false,
    resizable: false,
    aspectRatio: aspectRatio
  };

  const { cropperRef } = useImageCropper();
  const { compressImage, isLoading } = useCompressImage();

  const handleCropperDone = () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const canvas = cropper.getCanvas();
      setCropperEnabled(false);
      canvas &&
        canvas.toBlob(async blob => {
          const file = new File([blob as Blob], 'crop.png', {
            type: 'image/png'
          });
          const compressed = await compressImage(file);
          if (compressed && !isLoading) {
            setImageFile(compressed);
            setImageUrl(URL.createObjectURL(compressed));
          }
        });

      return;
    }
  };

  return (
    <>
      {cropperEnabled && (
        <div className={Wrapper}>
          <div className={cx(FlexCenter, CropperContainer)}>
            <span
              className={Float}
              onClick={handleCropperDone}>
              {complete}
            </span>
            <Cropper
              src={imageUrl}
              ref={cropperRef}
              {...circleType}
              className={CropperStyle}
              stencilProps={{ ...stencilProps }}
            />
          </div>
        </div>
      )}
    </>
  );
};

const Float = css`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
  color: white;
  font-size: var(--font-sizes-sm);
  font-weight: 600;
`;

const Wrapper = css`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: calc(100%);
  background-color: rgba(0, 0, 0, 0.8);
`;

const CropperContainer = css`
  height: 100%;
`;

const CropperStyle = css`
  color: var(--colors-main) !important;
  height: 100%;
  width: 100%;
`;

export default ImgCropper;
