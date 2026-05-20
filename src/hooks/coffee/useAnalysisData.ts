import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import {
  RankingDataType,
  CaffeineHistoryTypes,
  CaffeineIntakeTypes,
  CalendarData
} from '@/types/types';

export const useAnalysisData = (
  data: CaffeineHistoryTypes,
  signedIn: string,
  activeMonth: string
) => {
  const [circularChartData, setCircularChartData] = useState<
    { key: string; value: number }[]
  >([]);
  // const [circularChartSummaryData, setCircularChartSummaryData] = useState();
  const flatDetailsData = Object.values(data.details).flat();
  const intakeDates = Object.keys(data.details).length;
  const currentMonth =
    dayjs().format('YYYY-MM') === dayjs(activeMonth).format('YYYY-MM');

  // CoffeeSum.tsx
  const getCoffeeSumData = () => {
    const monthlyAcc = flatDetailsData.length;
    const dailyAverage = Math.round(monthlyAcc / intakeDates);
    return [dailyAverage, monthlyAcc, 0];
  };

  // CircularChart.tsx
  useEffect(() => {
    const { chartData } = handleFilteringData(data.summary);
    chartData && setCircularChartData(chartData);
  }, [activeMonth]);

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
  const circularChartSummaryData = handleFilteringData(
    data.summary
  ).summaryData;

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
