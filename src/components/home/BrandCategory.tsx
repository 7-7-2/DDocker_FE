import { useNavigate } from 'react-router-dom';

import { HOME_TEXTS } from '@/constants/home';
import { brandMapToKor } from '@/utils/convertBrandName';
import { BUTTON_TEXTS } from '@/constants/common';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Medium, SectionDivier, SumTitle } from '@/styles/styles';
import { Align, Between, Column, Flex } from '@/styles/layout';

const { brandList, title } = HOME_TEXTS.brandCategory;

const BrandCategory = () => {
  const navigate = useNavigate();
  const navToBrand = () => {
    navigate(`/brand`);
  };
  const navToBrandDetail = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/brand/${e.currentTarget.value}`);
  };
  return (
    <Container>
      <div className={cx(Flex, Between)}>
        <div className={SumTitle}>{title}</div>
        <ViewAllButton onClick={navToBrand}>
          {BUTTON_TEXTS.viewAll}
        </ViewAllButton>
      </div>
      <BrandList className={cx(Flex, Between)}>
        {brandList.map(brand => (
          <BrandItem
            className={cx(Column, Align)}
            key={brand}
            value={brand}
            onClick={navToBrandDetail}>
            <Logo
              src={`/png/${brand}.png`}
              alt={brand}
            />
            <BrandName className={Medium}>{brandMapToKor(brand)}</BrandName>
          </BrandItem>
        ))}
      </BrandList>
      <div className={SectionDivier} />
    </Container>
  );
};

const Container = styled.div`
  margin: 24px 0 18px;
`;
const ViewAllButton = styled.button`
  line-height: 22px;
  font-size: var(--font-sizes-sm);
  color: var(--colors-mid-grey);
`;

const BrandList = styled.div`
  width: 100%;
  overflow-x: scroll;
  margin: 18px 0;
`;

const BrandItem = styled.button`
  gap: 8px;
`;

const BrandName = styled.span`
  font-size: var(--font-sizes-xs);
  color: var(--colors-main-dark);
  line-height: 18px;
`;

const Logo = styled.img`
  height: 57px;
  width: 57px;
  border-radius: 50%;
  background-color: #fff;
`;

export default BrandCategory;
