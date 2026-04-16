import Icon from '@/components/common/Icon';
import { COFFEE_TEXTS } from '@/constants/coffee';
import { CafeDetailTypes } from '@/types/types';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import {
  PostsCafe,
  Cafe,
  PaddingL4,
  CaffeineDetail,
  ColorMain,
  Regular
} from '@/styles/styles';
import { Align } from '@/styles/layout';
import { cx } from 'styled-system/css';

interface CafeDetailContent extends CafeDetailTypes {
  mini?: boolean;
}

const { unit, containing, is } = COFFEE_TEXTS;

const CafeDetailContent = ({
  mini = false,
  posts,
  brand,
  onClick,
  productName,
  caffeine,
  shot,
  intensity,
  size
}: CafeDetailContent) => {
  const mild = intensity === '연하게';
  const base = intensity === '기본' && shot === 0;

  return (
    <>
      <div className={posts ? cx(PostsCafe, Align) : Cafe}>
        {posts && <Icon {...iconPropsGenerator('shop', '16')} />}
        <span className={posts ? PaddingL4 : Regular}>{brand}</span>
      </div>
      <div
        className={CaffeineDetail}
        onClick={onClick}>
        {!mini && mild && `${productName} (${intensity}, ${size})`}
        {!mini &&
          !mild &&
          !base &&
          `${productName} (${size}, ${intensity}, +${shot}샷)`}
        {!mini && !mild && base && `${productName} (${size}, ${intensity})`}
        {mini && `${productName} (+${shot}샷)`}
        <br />
        {!mini && containing}
        <span className={ColorMain}>
          {caffeine}
          {unit}
        </span>
        {!mini && is}
      </div>
    </>
  );
};

export default CafeDetailContent;
