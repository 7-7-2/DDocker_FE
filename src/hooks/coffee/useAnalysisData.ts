import { statsNavigationState } from '@/atoms/atoms';
import {
  RankingDataType,
  CaffeineHistoryTypes,
  CaffeineIntakeTypes,
  CalendarData
} from '@/types/types';
import { useRecoilValue } from 'recoil';

export const useAnalysisData = (
  data: CaffeineHistoryTypes,
  signedIn: string
) => {
  const currentWeek = useRecoilValue(statsNavigationState);
  const details = data ? data.details : [];
  const summary = data ? data.summary : [];

  const flatDetailsData = Object.values(details)?.flat();
  const intakeDates = Object.keys(details).length;
  // const currentMonth =
  //   dayjs().format('YYYY-MM') === dayjs(activeMonth).format('YYYY-MM');

  // CoffeeSum.tsx
  const getCoffeeSumData = () => {
    const monthlyAcc = flatDetailsData.length;
    const dailyAverage = Math.round(monthlyAcc / intakeDates) || 0;
    const intakeDays = summary.length;
    return [dailyAverage, monthlyAcc, intakeDays];
  };

  // const getWeekCoffeeSumData = () => {
  //   const weekPeriod = currentWeek.slice(3, 8).split('-');
  //   console.log('🚀 ~ getWeekCoffeeSumData ~ weekPeriod:', weekPeriod);

  //   const weeklyAcc = flatDetailsData.filter(
  //     item =>
  //       item.key > Number(weekPeriod[0]) || item.key < Number(weekPeriod[1])
  //   );
  //   console.log('🚀 ~ getWeekCoffeeSumData ~ weeklyAcc:', weeklyAcc);

  // };
  // getWeekCoffeeSumData();

  // CircularChart.tsx
  const handleFilteringData = (coffeeData: CalendarData[]) => {
    const recommended = coffeeData?.filter(
      item => item && Number(item.caffeineSum) <= 400
    ).length;

    const excessive = coffeeData?.filter(
      item => item && Number(item.caffeineSum) > 401
    ).length;

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
  } = handleFilteringData(summary);

  // BrandRanking.tsx
  const getbrandRankingData = () => {
    const accData = Object.entries(
      flatDetailsData.reduce<Record<string, number[]>>((acc, item) => {
        const intakeItem = item as CaffeineIntakeTypes;
        const key = intakeItem.brand;

        if (!acc[key]) {
          acc[key] = [];
        }

        acc[key].push(intakeItem.caffeine);
        return acc;
      }, {})
    );
    const sortedData = [...accData].sort((a, b) => b[1].length - a[1].length);
    const rankingData =
      sortedData.length > 4 ? sortedData.slice(0, 4) : sortedData;

    const notEnoughData = 4 - rankingData.length;
    if (!signedIn) {
      const emptyRows: RankingDataType[] = Array.from({ length: 4 }, () => [
        '',
        []
      ]);
      return emptyRows;
    }
    if (notEnoughData >= 1) {
      rankingData.push(
        ...(Array.from({ length: notEnoughData }, () => [
          '',
          []
        ]) as RankingDataType[])
      );

      return rankingData;
    }
    return rankingData;
  };

  return {
    getCoffeeSumData,
    getbrandRankingData,
    circularChartData,
    circularChartSummaryData
  };
};
