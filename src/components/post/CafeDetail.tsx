import { cx } from 'styled-system/css';
import { Column } from '@/styles/layout';
import { CafeDetailTypes } from '@/types/types';
import CafeDetailContent from '@/components/post/CafeDetailContent';

const CafeDetail = ({
  brand,
  className,
  caffeine,
  menu,
  shot,
  posts = false,
  onClick,
  intensity,
  size
}: CafeDetailTypes) => {
  const CafeDetailProps = {
    brand,
    caffeine,
    menu,
    shot,
    posts,
    onClick,
    intensity,
    size
  };
  return (
    <div className={cx(Column, className)}>
      <CafeDetailContent {...CafeDetailProps} />
    </div>
  );
};

export default CafeDetail;
