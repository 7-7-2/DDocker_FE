import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import { getMonthlyAnalysisData } from '@/api/coffee';
import { activeMonthState } from '@/atoms/atoms';
import { COFFEE_ANALYSIS_TEXTS } from '@/constants/coffee';

export const useGetAnalysisData = (signedIn: string, selectedTab: string) => {
  const activeMonth = useRecoilValue(activeMonthState);
  const unit =
    selectedTab === COFFEE_ANALYSIS_TEXTS.tabs[0] ? 'weekly' : 'monthly';

  const { data } = useQuery({
    queryKey: ['analysisData', activeMonth, unit],
    queryFn: async () => {
      const data = await getMonthlyAnalysisData(activeMonth, unit);
      return data;
    },
    enabled: !!signedIn
  });

  return { data };
};
