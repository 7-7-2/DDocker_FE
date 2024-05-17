import { getIconSize } from '@/utils/getIconProps';
import { NoImgProps } from '@/types/types';

const ImgContainer = ({
  url,
  comment = false,
  mini = false,
  post = false,
  onClick,
  onError
}: NoImgProps) => {
  return (
    <img
      className={getIconSize(comment, mini, post)}
      src={url}
      onClick={onClick}
      onError={onError}
    />
  );
};

export default ImgContainer;
