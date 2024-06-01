import Icon from '@/components/common/Icon';
import { COFFEE_TEXTS } from '@/constants/coffee';
import { TEXT } from '@/constants/texts';
import { Align } from '@/styles/layout';
import {
  PostsCafe,
  Cafe,
  PaddingL4,
  CaffeineDetail,
  ColorMain
} from '@/styles/styles';
import { CafeDetailTypes } from '@/types/types';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { cx } from 'styled-system/css';

interface CafeDetailContent extends CafeDetailTypes {
  mini?: boolean;
}

const { unit, including, is } = COFFEE_TEXTS;
const { mgLabel } = TEXT;

const CafeDetailContent = ({
  mini = false,
  posts,
  brand,
  onClick,
  menu,
  caffeine,
  shot
}: CafeDetailContent) => {
  return (
    <>
      <div className={posts ? cx(PostsCafe, Align) : Cafe}>
        {posts && <Icon {...iconPropsGenerator('shop', '16')} />}
        <span className={posts ? PaddingL4 : ''}>{brand}</span>
      </div>
      <div
        className={CaffeineDetail}
        onClick={onClick}>
        {`${menu} ${shot !== '0' ? `(+${shot}` : ''}${
          shot !== '0' ? '샷)' : ''
        }`}
        <br />
        {!mini && including}
        <span className={ColorMain}>
          {caffeine}
          {!mini && unit}
          {mini && mgLabel}
        </span>
        {!mini && is}
      </div>
    </>
  );
};

export default CafeDetailContent;
