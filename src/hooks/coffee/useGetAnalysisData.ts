import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { getMonthlyAnalysisData } from '@/api/coffee';
import { activeMonthState } from '@/atoms/atoms';

export const useGetAnalysisData = (signedIn: string) => {
  const activeMonth = useRecoilValue(activeMonthState);
  const { data } = useQuery({
    queryKey: ['analysisData', activeMonth],
    queryFn: async () => {
      const data = await getMonthlyAnalysisData(activeMonth);
      return data;
    },
    enabled: !!signedIn
  });
  return { data };
};
