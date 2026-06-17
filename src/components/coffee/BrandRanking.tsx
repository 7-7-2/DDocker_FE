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
  return (
    <Container className={cx(Flex, Align, idx === 0 && MarginT24)}>
      <Rank
        className={cx(
          FlexCenter,
          Bold,
          data.cups && idx === 0 ? BtnColorMain : defaultColor
        )}>
        {idx + 1}
      </Rank>
      {data.brand ? (
        <img
          className={Brand}
          src={`/png/${data.brand}.png`}
          alt={data.brand}
        />
      ) : (
        <div className={Brand} />
      )}
      <div className={cx(Column, FlexGrow)}>
        <span className={cx(Medium, colorMainDark)}>
          {data.brand ? brandMapToKor(data.brand) : brandRanking.emptyData}
        </span>
        {data.caffeine !== 0 && (
          <span className={fontSizeXs}>
            {data.caffeine}
            {unit.mg}
          </span>
        )}
      </div>
      <span
        className={cx(
          data.cups !== 0 && idx === 0 ? Bold : Medium,
          data.cups !== 0 && idx === 0 && PointColor
        )}>
        {data.cups}
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
