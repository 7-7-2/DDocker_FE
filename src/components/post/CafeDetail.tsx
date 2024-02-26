import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { cx } from 'styled-system/css';
import { Column, Flex, Align } from '@/styles/layout';
import { Cafe, CaffeineDetail, PostsCafe } from '@/styles/styles';
import { COFFEE_TEXTS } from '@/constants/coffee';
import { ColorMain } from '@/styles/styles';

const { unit, including, is } = COFFEE_TEXTS;

// 하드코딩 텍스트 데이터로 변경예정
const CafeDetail = ({
  brand,
  className,
  caffeine,
  menu,
  shot,
  posts = false
}: {
  brand: string;
  className?: string;
  caffeine?: string | number;
  menu?: string;
  shot?: string | number;
  posts?: boolean;
}) => {
  return (
    <div className={cx(Column, className)}>
      <div className={posts ? cx(PostsCafe, Align) : Cafe}>
        {posts && <Icon {...iconPropsGenerator('shop', '16')} />}
        <span>{brand}</span>
      </div>
      <div className={CaffeineDetail}>
        {`${menu} ${shot !== '0' ? `(+${shot}` : ''}${
          shot !== '0' ? '샷)' : ''
        }`}
        <br />
        {including}
        <span className={ColorMain}>
          {caffeine}
          {unit}
        </span>
        {is}
      </div>
    </div>
  );
};

export default CafeDetail;
