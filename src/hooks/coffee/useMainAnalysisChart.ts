import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { statsNavigationState } from '@/atoms/atoms';

import { MainAnalysisChartDataType } from '@/types/types';
import { COFFEE_ANALYSIS_TEXTS } from '@/constants/coffee';

export const useMainAnalysisChart = (
  period: string,
  analysisData: MainAnalysisChartDataType[]
) => {
  const [referenceUnit, setReferenceUnit] = useState(14);
  const [caffeineReferenceUnit, setCaffeineReferenceUnit] = useState(0);
  const setCurrentWeek = useSetRecoilState(statsNavigationState);

  const { userData } = useCachedUserInfo();
  const newUser = userData?.sum === 0;

  const labelFormatter = (label: string) => {
    if (period === COFFEE_ANALYSIS_TEXTS.tabs[0]) {
      const res = label.split('-')[1];
      return res;
    }
    return label.slice(2, 7);
  };

  const setBarHeight = () => {
    const data = Object.values(analysisData);
    const cupsValues = data?.map(item => item.cups);
    const caffeineValues = data?.map(item => item.caffeineMg);
    setCaffeineReferenceUnit(140 / Math.max(...caffeineValues));
    setReferenceUnit(140 / Math.max(...cupsValues));
    return;
  };

  const setNavValue = () => {
    if (period === COFFEE_ANALYSIS_TEXTS.tabs[0]) {
      const weekNum = String(
        analysisData[analysisData?.length - 1].label
      ).split(' -');
      const navValue = `${weekNum[0]}-${weekNum[1].split('.')[1]}`;
      return setCurrentWeek(navValue);
    } else return setCurrentWeek('');
  };

  useEffect(() => {
    analysisData && setBarHeight();
    analysisData && setNavValue();
  }, [analysisData]);

  return { newUser, labelFormatter, referenceUnit, caffeineReferenceUnit };
};
