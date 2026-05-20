import CoffeeSum from '@/components/coffee/CoffeeSum';
import CircularChart from '@/components/coffee/CircularChart';
import BrandRanking from '@/components/coffee/BrandRanking';

import { useGetCalendarData } from '@/hooks/coffee/useGetCalendarData';
import { useAnalysisData } from '@/hooks/coffee/useAnalysisData';
import { brandMapToKor } from '@/utils/convertBrandName';

import { COFFEE_ANALYSIS_TEXTS } from '@/constants/coffee';

import { styled } from 'styled-system/jsx';
import { Flex } from '@/styles/layout';
import { Bold, PointColor, SectionDivier, Summary } from '@/styles/styles';
import CircularChartSummary from '@/components/coffee/ CircularChartSummary';

const { brandRanking } = COFFEE_ANALYSIS_TEXTS;
const AnalysisTab = ({ signedIn }: { signedIn: string }) => {
  const { data: calendarData, activeMonth } = useGetCalendarData(signedIn);
  const {
    getCoffeeSumData,
    getbrandRankingData,
    circularChartData,
    circularChartSummaryData
  } = useAnalysisData(calendarData, signedIn, activeMonth);

  const coffeeSumData = getCoffeeSumData();
  const brandRankingData = getbrandRankingData();

  return (
    <>
      <CoffeeSum data={coffeeSumData} />

      <ContentsBox>
        <Summary></Summary>
        <div></div>
      </ContentsBox>
      <div className={SectionDivier} />

      <ContentsBox>
        <CircularChartSummary
          circularChartSummaryData={circularChartSummaryData}
        />
        <CircularChart circularChartData={circularChartData} />
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
            key={idx}
            data={item}
            idx={idx}
          />
        ))}
      </ContentsBox>
    </>
  );
};

const ContentsBox = styled.div`
  padding: 32px 0;
`;

export default AnalysisTab;
