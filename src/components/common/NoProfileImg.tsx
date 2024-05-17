import Icon from '@/components/common/Icon';
import { NoImgProps } from '@/types/types';
import {
  getIconPropSize,
  getIconSize,
  getIconType
} from '@/utils/getIconProps';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

const NoProfileImg = ({
  onClick,
  post = false,
  mini = false,
  comment = false
}: Pick<NoImgProps, 'onClick' | 'post' | 'mini' | 'comment'>) => {
  return (
    <div className={getIconSize(comment, mini, post)}>
      <Icon
        {...iconPropsGenerator(
          getIconType(comment, mini, post),
          getIconPropSize(comment, mini, post)
        )}
        onClick={onClick}
      />
    </div>
  );
};

export default NoProfileImg;
