import { brandMapToKor } from '@/utils/convertBrandName';
import { RankingDataType } from '@/types/types';
import { COFFEE_ANALYSIS_TEXTS } from '@/constants/coffee';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Column, Flex, FlexCenter, FlexGrow } from '@/styles/layout';
import {
  Bold,
  Brand,
  BtnColorMain,
  MarginT24,
  Medium,
  PointColor,
  colorMainDark,
  defaultColor,
  fontSizeXs
} from '@/styles/styles';

const { unit, brandRanking } = COFFEE_ANALYSIS_TEXTS;
const BrandRanking = ({
  data,
  idx
}: {
  data: RankingDataType;
  idx: number;
}) => {
  const caffeineSum = data[1].length
    ? data[1].reduce((acc, cur) => {
        return acc + cur;
      })
    : 0;

  return (
    <Container className={cx(Flex, Align, idx === 0 && MarginT24)}>
      <Rank
        className={cx(
          FlexCenter,
          Bold,
          data[0] && idx === 0 ? BtnColorMain : defaultColor
        )}>
        {idx + 1}
      </Rank>
      {data[0] ? (
        <img
          className={Brand}
          src={`/png/${data[0]}.png`}
          alt={data[0]}
        />
      ) : (
        <div className={Brand} />
      )}
      <div className={cx(Column, FlexGrow)}>
        <span className={cx(Medium, colorMainDark)}>
          {data[0] ? brandMapToKor(data[0]) : brandRanking.emptyData}
        </span>
        {caffeineSum !== 0 && (
          <span className={fontSizeXs}>
            {caffeineSum}
            {unit.mg}
          </span>
        )}
      </div>
      <span
        className={cx(
          data[1].length !== 0 && idx === 0 ? Bold : Medium,
          data[1].length !== 0 && idx === 0 && PointColor
        )}>
        {data[1].length}
        {unit.cup}
      </span>
    </Container>
  );
};

const Container = styled.div`
  height: 76px;
  padding: 16px 0;
  color: var(--colors-mid-grey);
  font-size: var(--font-sizes-base);
  border-bottom: solid 1px var(--colors-border-grey);
`;

const Rank = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: 20px;
`;

export default BrandRanking;
