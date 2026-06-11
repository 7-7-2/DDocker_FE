import MainAnalysisChart from '@/components/coffee/MainAnalysisChart';
import PillTabs from '@/components/common/PillTabs';

import { useGetAnalysisData } from '@/hooks/coffee/useGetAnalysisData';
import { useSelectTab } from '@/hooks/useSelectTab';

import { COFFEE_ANALYSIS_TEXTS } from '@/constants/coffee';

import { cx } from 'styled-system/css';
import { Bold, MarginT22, PointColor, Summary } from '@/styles/styles';

const { mainChart, tabs } = COFFEE_ANALYSIS_TEXTS;
const MainAnalysis = ({
  signedIn,
  selectedTab: period
}: {
  signedIn: string;
  selectedTab: string;
}) => {
  const { data: analysisData } = useGetAnalysisData(signedIn);
  const { selectedTab, handleSelectTab } = useSelectTab(mainChart.tabs[0]);

  return (
    <>
      <PillTabs
        tabs={mainChart.tabs}
        selectedTab={selectedTab}
        handleButtonClick={handleSelectTab}
        type="stats"
      />

      <div className={cx(Bold, MarginT22)}>
        <Summary>
          {period === tabs[0]
            ? mainChart.summary.weekly
            : mainChart.summary.monthly}
        </Summary>
        <Summary>
          {selectedTab === mainChart.tabs[0]
            ? mainChart.summary.cup[0]
            : mainChart.summary.caffeine[0]}
          <span
            className={
              analysisData?.weeks[6].cups ||
              (analysisData?.weeks[6].caffeineMg && PointColor)
            }>
            {period === tabs[0] && selectedTab === mainChart.tabs[0]
              ? analysisData?.weeks[6].cups
              : analysisData?.weeks[6].caffeineMg}
            {selectedTab === mainChart.tabs[0]
              ? mainChart.unit.cup
              : mainChart.unit.mg}
          </span>
          {selectedTab === mainChart.tabs[0]
            ? mainChart.summary.cup[1]
            : mainChart.summary.caffeine[1]}
        </Summary>
      </div>

      <MainAnalysisChart
        period={period}
        analysisData={
          period === tabs[0] ? analysisData?.weeks : analysisData?.months
        }
        selectedTab={selectedTab}
      />
    </>
  );
};

export default MainAnalysis;
