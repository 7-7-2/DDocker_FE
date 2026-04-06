import { MouseEventHandler, useState } from 'react';

import { Label } from '@/components/common/Label';
import { LABEL_TEXTS } from '@/constants/common';

import useGetCoffeeList from '@/hooks/useGetCoffeeList';
import { brandMapToKor } from '@/utils/convertBrandName';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Column } from '@/styles/layout';
import { BrandBtn, DisabledBrandBtn, selectedBrandBtn } from '@/styles/styles';

const FavoriteBrandEditer = ({
  userBrand
}: {
  userBrand: string | undefined;
}) => {
  const brandList = useGetCoffeeList('brand') as string[];
  const [selectedValue, selectValue] = useState(userBrand);
  const selectbrand: MouseEventHandler<HTMLButtonElement> = e => {
    selectValue(e.currentTarget.value);
  };

  return (
    <div className={Column}>
      <Label
        label={LABEL_TEXTS.favBrand}
        icon={true}
        inputValue={selectedValue}
        initValue={userBrand}
      />
      <BrandList>
        {brandList.map(item => (
          <button
            className={cx(
              selectedValue === item ? selectedBrandBtn : DisabledBrandBtn,
              BrandBtn
            )}
            onClick={selectbrand}
            value={item}>
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
