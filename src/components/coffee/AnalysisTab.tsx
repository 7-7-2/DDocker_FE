import CoffeeSum from '@/components/coffee/CoffeeSum';
import CircularChart from '@/components/coffee/CircularChart';
import BrandRanking from '@/components/coffee/BrandRanking';
import CircularChartSummary from '@/components/coffee/ CircularChartSummary';
import MainAnalysis from '@/components/coffee/MainAnalysis';
import PillTabs from '@/components/common/PillTabs';

import { useAnalysisData } from '@/hooks/coffee/useAnalysisData';
import { useSelectTab } from '@/hooks/useSelectTab';
import { brandMapToKor } from '@/utils/convertBrandName';

import { COFFEE_ANALYSIS_TEXTS } from '@/constants/coffee';

import { styled } from 'styled-system/jsx';
import { Flex } from '@/styles/layout';
import {
  Bold,
  MarginB72,
  PointColor,
  SectionDivier,
  Summary
} from '@/styles/styles';

const { brandRanking, tabs } = COFFEE_ANALYSIS_TEXTS;
const AnalysisTab = ({ signedIn }: { signedIn: string }) => {
  const { selectedTab, handleSelectTab } = useSelectTab(tabs[0]);
  const {
    coffeeSumData,
    mainAnalysisChartData,
    brandRankingData,
    circularChartData,
    circularChartSummaryData
  } = useAnalysisData(signedIn, selectedTab);

  return (
    <>
      <CoffeeSum
        data={coffeeSumData}
        selectedTab={selectedTab}
      />
      <ContentsBox>
        <MainAnalysis
          analysisData={mainAnalysisChartData}
          selectedTab={selectedTab}
        />
      </ContentsBox>
      <div className={SectionDivier} />

      <ContentsBox>
        <CircularChartSummary
          circularChartSummaryData={circularChartSummaryData}
        />
        <CircularChart circularChartData={circularChartData} />
      </ContentsBox>
      <div className={SectionDivier} />

      <ContentsBox className={MarginB72}>
        <Summary className={Bold}>
          {brandRankingData && brandRankingData[0]['cups'] ? (
            <>
              <span className={Flex}>
                <span className={PointColor}>
                  {brandMapToKor(brandRankingData[0]['brand'])}
                </span>
                {brandRanking.summary[0]}
              </span>
              {brandRanking.summary[1]}
            </>
          ) : (
            <>{brandRanking.guestUser}</>
          )}
        </Summary>
        {brandRankingData?.map((item, idx) => (
          <BrandRanking
            key={idx}
            data={item}
            idx={idx}
          />
        ))}
      </ContentsBox>

      <PillTabsContainer>
        <PillTabs
          tabs={tabs}
          selectedTab={selectedTab}
          handleButtonClick={handleSelectTab}
          type="stats-period"
        />
      </PillTabsContainer>
    </>
  );
};

const ContentsBox = styled.div`
  padding: 32px 0;
`;
const PillTabsContainer = styled.div`
  position: fixed;
  bottom: 80px;
  width: calc(100% - 40px);
`;
export default AnalysisTab;
