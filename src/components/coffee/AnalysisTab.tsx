import CoffeeSum from '@/components/coffee/CoffeeSum';
import CircularChart from '@/components/coffee/CircularChart';
import BrandRanking from '@/components/coffee/BrandRanking';
import CircularChartSummary from '@/components/coffee/ CircularChartSummary';
import MonthlyAnalysis from '@/components/coffee/MonthlyAnalysis';

import { useGetCalendarData } from '@/hooks/coffee/useGetCalendarData';
import { useAnalysisData } from '@/hooks/coffee/useAnalysisData';
import { brandMapToKor } from '@/utils/convertBrandName';

import { COFFEE_ANALYSIS_TEXTS } from '@/constants/coffee';

import { styled } from 'styled-system/jsx';
import { Flex } from '@/styles/layout';
import { Bold, PointColor, SectionDivier, Summary } from '@/styles/styles';

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
        <MonthlyAnalysis signedIn={signedIn} />
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
        <Summary className={Bold}>
          {brandRankingData[0][0] ? (
            <>
              <span className={Flex}>
                <span className={PointColor}>
                  {brandMapToKor(brandRankingData[0][0])}
                </span>
                {brandRanking.summary[0]}
              </span>
              {brandRanking.summary[1]}
            </>
          ) : (
            <>{brandRanking.guestUser}</>
          )}
        </Summary>

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
