import { useNavigate } from 'react-router-dom';

import Icon from '@/components/common/Icon';
import useGetCoffeeList from '@/hooks/useGetCoffeeList';
import { useShowFooter } from '@/hooks/useShowFooter';
import { brandMapToKor } from '@/utils/convertBrandName';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Between, Center, Column, Flex } from '@/styles/layout';
import { Gap16, Gap24, MarginB12, MarginT24, Medium } from '@/styles/styles';

const BrandList = () => {
  useShowFooter(false);
  const brandList = useGetCoffeeList('brand') as string[];
  const navigate = useNavigate();
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/brand/${e.currentTarget.value}`);
  };

  return (
    <div className={cx(MarginT24, MarginB12, Gap24, Column)}>
      {brandList.map(brand => (
        <div
          className={cx(Flex, Between)}
          key={brand}>
          <div className={cx(Flex, Center, Gap16)}>
            <BrandLogo
              src={`/png/${brand}.png`}
              alt={brand}
            />
            <Label className={Medium}>{brandMapToKor(brand)}</Label>
          </div>
          <Button
            onClick={handleOnClick}
            value={brand}>
            <Icon {...iconPropsGenerator('right', '20')} />
          </Button>
        </div>
      ))}
    </div>
  );
};
const BrandLogo = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 50%;
`;
const Label = styled.span`
  font-size: var(--font-sizes-base);
  color: var(--colors-main-dark);
`;
const Button = styled.button`
  width: 66px;
  height: 46px;
  margin-right: -20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export default BrandList;
