import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { cx } from 'styled-system/css';
import { Column, Align } from '@/styles/layout';
import { Cafe, CaffeineDetail, PaddingL6, PostsCafe } from '@/styles/styles';

// 하드코딩 텍스트 데이터로 변경예정
const CafeDetail = ({
  brand,
  className,
  posts = false
}: {
  brand: string;
  className?: string;
  posts?: boolean;
}) => {
  return (
    <div className={cx(Column, className)}>
      <div className={posts ? cx(PostsCafe, Align) : Cafe}>
        {posts && <Icon {...iconPropsGenerator('shop', '16')} />}
        <span className={PaddingL6}>{brand}</span>
      </div>
      <div className={CaffeineDetail}>
        ICED 아메리카노 (+2샷)
        <br />
        포함된 카페인 함량은 185mg입니다.
      </div>
    </div>
  );
};

export default CafeDetail;
