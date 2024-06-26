import { COFFEE_TEXTS } from '@/constants/coffee';
import convertBrandName from '@/utils/convertBrandName';
import { TodayCoffeeInfoItemTypes } from '@/types/types';
import { Column, Flex } from '@/styles/layout';
import { RecentSearch, SumType } from '@/styles/styles';
import { styled } from 'styled-system/jsx';

const { unit } = COFFEE_TEXTS;

const TodayMenuItem = (data: { data: TodayCoffeeInfoItemTypes }) => {
  const icon = `/png/${data.data.brand}.png`;

  return (
    <Container className={Flex}>
      <IconCotainer
        src={icon}
        alt={data.data.brand}
      />
      <div className={Column}>
        <span className={RecentSearch}>
          {data.data.caffeine}
          {unit}
        </span>
        <span className={SumType}>{convertBrandName(data.data.brand)}</span>
      </div>
    </Container>
  );
};

const Container = styled.div`
  min-width: 134px;
  height: 52px;
  border-radius: 50px;
  margin-right: 8px;
  padding: 6px;
  border: 1px solid #ccc;
  background: #fff;
`;
const IconCotainer = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export default TodayMenuItem;
