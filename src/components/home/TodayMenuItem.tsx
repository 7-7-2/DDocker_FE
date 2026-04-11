import { COFFEE_TEXTS } from '@/constants/coffee';
import { brandMapToKor } from '@/utils/convertBrandName';
import { TodayCoffeeInfoItemTypes } from '@/types/types';
import { Column, Flex } from '@/styles/layout';
import { Medium, RecentSearch, Semibold, SumType } from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';

const { unit } = COFFEE_TEXTS;

const TodayMenuItem = (data: { data: TodayCoffeeInfoItemTypes }) => {
  const itemInfo = data.data;
  const icon = `/png/${itemInfo.brandName}.png`;

  return (
    <Container className={Flex}>
      <IconCotainer
        src={icon}
        alt={itemInfo.brandName}
      />
      <div className={Column}>
        <Caffeine className={Semibold}>
          {itemInfo.caffeine}
          {unit}
        </Caffeine>
        <span className={cx(Medium, SumType)}>
          {brandMapToKor(itemInfo.brandName)}
        </span>
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
  border: 1px solid var(--colors-btn-grey);
  background: #fff;
  align-items: center;
`;
const IconCotainer = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;
const Caffeine = styled.span`
  line-height: 20px;
  color: var(--colors-main-dark);
  font-size: var(--font-sixes-base);
`;

export default TodayMenuItem;
