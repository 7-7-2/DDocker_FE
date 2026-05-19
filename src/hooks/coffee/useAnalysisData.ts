import {
  CaffeineHistoryTypes,
  RankingDataType,
  CaffeineIntakeTypes
} from '@/types/types';

export const useAnalysisData = (
  data: CaffeineHistoryTypes,
  signedIn: string
) => {
  const flatDetailsData = Object.values(data.details).flat();

  const getCoffeeSumData = () => {
    const intakeDates = Object.keys(data.details).length;
    const monthlyAcc = flatDetailsData.length;
    const dailyAverage = Math.round(monthlyAcc / intakeDates);
    return [dailyAverage, monthlyAcc, 0];
  };

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

  return { getCoffeeSumData, getbrandRankingData };
};
