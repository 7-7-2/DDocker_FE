import { useGetAnalysisData } from '@/hooks/coffee/useGetAnalysisData';
import { RankingDataType, AnalysisDataTypes } from '@/types/types';

export const useAnalysisData = (signedIn: string, selectedTab: string) => {
  const { data } = useGetAnalysisData(signedIn, selectedTab);
  const analysisData = data as AnalysisDataTypes;
  const intakeDates = analysisData?.metrics.totalDays || 0;

  // CoffeeSum.tsx
  const coffeeSumData = analysisData?.metrics;

  // MainAnalysis.tsx
  const mainAnalysisChartData = analysisData?.chart;

  // CircularChart.tsx
  const handleFilteringData = () => {
    const recommended = analysisData?.threshold.moderateCount || 0;
    const excessive = analysisData?.threshold.excessiveCount || 0;

    const chartData = [
      { key: 'recommended', value: (recommended / intakeDates) * 100 },
      { key: 'excessive', value: (excessive / intakeDates) * 100 }
    ];

    const summaryData = {
      intakeDates: intakeDates,
      recommended: recommended,
      excessive: excessive
    };

    return { summaryData, chartData };
  };
  const {
    summaryData: circularChartSummaryData,
    chartData: circularChartData
  } = handleFilteringData();

  // BrandRanking.tsx
  const getbrandRankingData = () => {
    const notEnoughData = analysisData?.ranking
      ? 4 - analysisData?.ranking.length
      : 4;
    const emptyData = { brand: '', cups: 0, caffeine: 0 };
    const rankingData = analysisData?.ranking;
    if (!signedIn) {
      const emptyRows: RankingDataType[] = Array.from(
        { length: 4 },
        () => emptyData
      );
      return emptyRows;
    }
    if (notEnoughData >= 1) {
      rankingData?.push(
        ...Array.from({ length: notEnoughData }, () => emptyData)
      );

      return rankingData;
    }
    return rankingData;
  };
  const brandRankingData = getbrandRankingData();

  return {
    coffeeSumData,
    mainAnalysisChartData,
    circularChartData,
    circularChartSummaryData,
    brandRankingData
  };
};
