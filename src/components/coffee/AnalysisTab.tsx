import { useState } from 'react';
import { COFFEE_ANALYSIS_TEXTS } from '@/constants/coffee';
import {
  Align,
  Center,
  Column,
  Flex,
  FlexCenter,
  FlexGrow,
  Grid
} from '@/styles/layout';
import { styled } from 'styled-system/jsx';
import { css, cx } from 'styled-system/css';
import {
  Bold,
  BtnColorMain,
  MarginT24,
  Medium,
  SectionDivier
} from '@/styles/styles';
import { brandMapToKor } from '@/utils/convertBrandName';
import DonutChart from '@/components/coffee/DonutChart';
const { coffeeSum, unit, donutChart, brandRanking } = COFFEE_ANALYSIS_TEXTS;
const data = [2, 21, 4];
const rankingData = [
  { brandName: 'starbucks', caffeine: 150, cups: 7 },
  { brandName: 'starbucks', caffeine: 150, cups: 7 },
  { brandName: 'starbucks', caffeine: 150, cups: 7 }
];
interface rankingDataType {
  brandName: string;
  caffeine: number;
  cups: number;
}

const AnalysisTab = ({ signedIn }: { signedIn: string }) => {
  const [most] = useState(0);

  const brandRankingData = (rankingData: rankingDataType[]) => {
    const notEnoughData = 4 - rankingData.length;
    if (!signedIn) {
      rankingData.push(
        ...Array<rankingDataType>(4).fill({
          brandName: '',
          caffeine: 0,
          cups: 0
        })
      );
      return rankingData;
    }
    if (notEnoughData >= 1) {
      rankingData.push(
        ...Array<rankingDataType>(notEnoughData).fill({
          brandName: '',
          caffeine: 0,
          cups: 0
        })
      );
      return rankingData;
    }
    return rankingData;
  };

  return (
    <>
      <CoffeeSum className={Grid}>
        {coffeeSum.text.map((item, idx) => (
          <div
            key={item}
            className={cx(
              Column,
              Center,
              coffeeSum.text.length - 1 !== idx && BorderRight
            )}>
            <span className={Bold}>
              {data[idx]}
              {coffeeSum.text.length - 1 !== idx ? unit.cup : unit.day}
            </span>
            <Text>{item}</Text>
          </div>
        ))}
      </CoffeeSum>

      <ContentsBox>
        <Summary></Summary>
        <div></div>
      </ContentsBox>
      <div className={SectionDivier} />

      <ContentsBox>
        {signedIn ? (
          <Summary className={Bold}>
            {donutChart.summary.pre}
            <p className={Flex}>
              <span className={PointColor}>
                {donutChart.summary.point[most]}
              </span>
              {donutChart.summary.suf}
            </p>
          </Summary>
        ) : (
          <Summary>{donutChart.summary.guestUser}</Summary>
        )}
        <Caption>
          {donutChart.caption.pre}
          {20}
          {unit.day}
          {donutChart.caption.mid}
          {10}
          {unit.day}
          {donutChart.caption.suf['recommended']}
        </Caption>
        <DonutChart />
      </ContentsBox>
      <div className={SectionDivier} />

      <ContentsBox>
        {signedIn ? (
          <Summary className={Bold}>
            <span className={Flex}>
              <span className={PointColor}>스타벅스</span>
              {brandRanking.summary[0]}
            </span>
            {brandRanking.summary[1]}
          </Summary>
        ) : (
          <Summary>{brandRanking.guestUser}</Summary>
        )}
        {brandRankingData(rankingData).map((item, idx) => (
          <BrandRanking
            key={idx}
            className={cx(Flex, Align, idx === 0 && MarginT24)}>
            <Rank
              className={cx(
                FlexCenter,
                Bold,
                item.brandName && idx === 0 ? BtnColorMain : defaultColor
              )}>
              {idx + 1}
            </Rank>
            {item.brandName ? (
              <img
                className={Brand}
                src={`/png/${item.brandName}.png`}
                alt={item.brandName}
              />
            ) : (
              <div className={Brand} />
            )}
            <div className={cx(Column, FlexGrow)}>
              <span className={cx(Medium, colorMainDark)}>
                {item.brandName
                  ? brandMapToKor(item.brandName)
                  : brandRanking.emptyData}
              </span>
              {item.caffeine !== 0 && (
                <span className={fontSizeXs}>
                  {item.caffeine}
                  {unit.mg}
                </span>
              )}
            </div>
            <span
              className={cx(
                idx === 0 ? Bold : Medium,
                idx === 0 && PointColor
              )}>
              {item.cups}
              {unit.cup}
            </span>
          </BrandRanking>
        ))}
      </ContentsBox>
    </>
  );
};

const CoffeeSum = styled.div`
  height: 80px;
  grid-template-columns: 1fr 1fr 1fr;
  border-radius: 10px;
  padding: 20px 0;
  margin-bottom: 26px;
  font-size: var(--font-sizes-base);
  line-height: 24px;
  background-color: var(--colors-main);
  color: #fff;
`;
const Text = styled.span`
  font-size: var(--font-sizes-xs);
`;

const ContentsBox = styled.div`
  padding: 32px 0;
`;

const Summary = styled.div`
  color: var(--colors-main-dark);
  font-size: var(--font-sizes-xl);
  line-height: 28px;
  white-space: pre-wrap;
`;

const Caption = styled.div`
  color: var(--colors-mid-grey);
  font-size: var(--font-sizes-sm);
  line-height: 22px;
`;

const BrandRanking = styled.div`
  height: 76px;
  padding: 16px 0;
  color: var(--colors-mid-grey);
  font-size: var(--font-sizes-base);
`;

const Rank = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: 20px;
`;
const Brand = css`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  margin-right: 12px;
  background-color: var(--colors-btn-grey);
`;

const BorderRight = css`
  border-right: solid 1px rgba(255, 255, 255, 0.2);
`;

const fontSizeXs = css`
  font-size: var(--font-sizes-xs);
`;
const colorMainDark = css`
  color: var(--colors-main-dark);
`;
const PointColor = css`
  color: var(--colors-main);
`;
const defaultColor = css`
  background-color: var(--colors-btn-grey);
  color: #fff;
`;
export default AnalysisTab;
