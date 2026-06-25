import CoffeeSum from '@/components/coffee/CoffeeSum';
import CircularChart from '@/components/coffee/CircularChart';
import BrandRanking from '@/components/coffee/BrandRanking';
import CircularChartSummary from '@/components/coffee/ CircularChartSummary';
import MainAnalysis from '@/components/coffee/MainAnalysis';
import PillTabs from '@/components/common/PillTabs';
import AnalysisLoginCTA from '@/components/coffee/AnalysisLoginCTA';

import { useAnalysisData } from '@/hooks/coffee/useAnalysisData';
import { useSelectTab } from '@/hooks/useSelectTab';
import { brandMapToKor } from '@/utils/convertBrandName';

import { COFFEE_ANALYSIS_TEXTS } from '@/constants/coffee';

import { styled } from 'styled-system/jsx';
import { Flex } from '@/styles/layout';
import {
  Bold,
  MarginB100,
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

  const PillTabsPosition = signedIn ? 'fixed' : 'relative';

  return (
    <Container className={signedIn ? MarginB72 : MarginB100}>
      <AnalysisLoginCTA />
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
      <PillTabsContainer style={{ position: `${PillTabsPosition}` }}>
        <PillTabs
          tabs={tabs}
          selectedTab={selectedTab}
          handleButtonClick={handleSelectTab}
          type="stats-period"
        />
      </PillTabsContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  overflow-x: hidden;
`;
const ContentsBox = styled.div`
  padding: 32px 0;
`;
const PillTabsContainer = styled.div`
  bottom: 80px;
`;

export default AnalysisTab;
