import MontlyAnalysisChart from '@/components/coffee/MontlyAnalysisChart';
import PillTabs from '@/components/common/PillTabs';
import { COFFEE_ANALYSIS_TEXTS } from '@/constants/coffee';
import { useGetAnalysisData } from '@/hooks/coffee/useGetAnalysisData';
import { useSelectTab } from '@/hooks/useSelectTab';
import { Summary } from '@/styles/styles';
const { MonthlyChart } = COFFEE_ANALYSIS_TEXTS;
const MonthlyAnalysis = ({ signedIn }: { signedIn: string }) => {
  const { data: analysisData } = useGetAnalysisData(signedIn);
  const { selectedTab, handleSelectTab } = useSelectTab(MonthlyChart.tabs[0]);

  return (
    <>
      <PillTabs
        tabs={MonthlyChart.tabs}
        selectedTab={selectedTab}
        handleButtonClick={handleSelectTab}
        type="stats"
      />
      <Summary></Summary>
      <MontlyAnalysisChart
        analysisData={analysisData?.weeks}
        selectedTab={selectedTab}
      />
    </>
  );
};

export default MonthlyAnalysis;
