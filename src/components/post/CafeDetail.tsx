import { cx } from 'styled-system/css';
import { Column } from '@/styles/layout';
import { CafeDetail } from '@/types/types';
import CafeDetailContent from '@/components/post/CafeDetailContent';

const CafeDetail = ({
  brand,
  className,
  caffeine,
  menu,
  shot,
  posts = false,
  onTouchEnd
}: CafeDetail) => {
  const CafeDetailProps = {
    brand,
    caffeine,
    menu,
    shot,
    posts,
    onTouchEnd
  };
  return (
    <div className={cx(Column, className)}>
      <CafeDetailContent {...CafeDetailProps} />
    </div>
  );
};

export default CafeDetail;
