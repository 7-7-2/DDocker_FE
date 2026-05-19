import { useState } from 'react';

import DonutChart from '@/components/coffee/DonutChart';
import BrandRanking from '@/components/coffee/BrandRanking';

import { useGetCalendarData } from '@/hooks/coffee/useGetCalendarData';
import { useAnalysisData } from '@/hooks/coffee/useAnalysisData';
import { brandMapToKor } from '@/utils/convertBrandName';

import { COFFEE_ANALYSIS_TEXTS } from '@/constants/coffee';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Center, Column, Flex, Grid } from '@/styles/layout';
import { Bold, BorderRight, PointColor, SectionDivier } from '@/styles/styles';

const { coffeeSum, unit, donutChart, brandRanking } = COFFEE_ANALYSIS_TEXTS;
const AnalysisTab = ({ signedIn }: { signedIn: string }) => {
  const [most] = useState(0);
  const { data: calendarData, activeMonth } = useGetCalendarData(signedIn);
  const { getCoffeeSumData, getbrandRankingData } = useAnalysisData(
    calendarData,
    signedIn
  );

  const coffeeSumData = getCoffeeSumData();
  const brandRankingData = getbrandRankingData();

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
              {coffeeSumData[idx]}
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
        <DonutChart
          calendarData={calendarData}
          activeMonth={activeMonth}
        />
      </ContentsBox>
      <div className={SectionDivier} />

      <ContentsBox>
        {signedIn ? (
          <Summary className={Bold}>
            <span className={Flex}>
              <span className={PointColor}>
                {brandMapToKor(brandRankingData[0][0])}
              </span>
              {brandRanking.summary[0]}
            </span>
            {brandRanking.summary[1]}
          </Summary>
        ) : (
          <Summary>{brandRanking.guestUser}</Summary>
        )}
        {brandRankingData.map((item, idx) => (
          <BrandRanking
            data={item}
            idx={idx}
          />
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

export default AnalysisTab;
