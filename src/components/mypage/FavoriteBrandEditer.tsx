import { MouseEventHandler } from 'react';

import { Label } from '@/components/common/Label';
import { LABEL_TEXTS } from '@/constants/common';

import useGetCoffeeList from '@/hooks/useGetCoffeeList';
import { brandMapToKor } from '@/utils/convertBrandName';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Column } from '@/styles/layout';
import { BrandBtn, DisabledBrandBtn, selectedBrandBtn } from '@/styles/styles';

const FavoriteBrandEditer = ({
  userBrand,
  selectedFavBrand,
  selectbrand
}: {
  userBrand: string | undefined;
  selectedFavBrand: string | undefined;
  selectbrand: MouseEventHandler<HTMLButtonElement>;
}) => {
  const brandList = useGetCoffeeList('brand') as string[];

  return (
    <div className={Column}>
      <Label
        label={LABEL_TEXTS.favBrand}
        icon={true}
        inputValue={selectedFavBrand}
        initValue={userBrand}
      />
      <BrandList>
        {brandList.map(item => (
          <button
            className={cx(
              selectedFavBrand === item ? selectedBrandBtn : DisabledBrandBtn,
              BrandBtn
            )}
            onClick={selectbrand}
            value={item}
            key={item}>
            {brandMapToKor(item)}
          </button>
        ))}
      </BrandList>
    </div>
  );
};

const BrandList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export default FavoriteBrandEditer;
