import { useLayoutEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { footerShowState } from '@/atoms/atoms';

export const useShowFooter = (show: boolean) => {
  const setFooterState = useSetRecoilState(footerShowState);

  useLayoutEffect(() => {
    setFooterState(show);
  });
  return null;
};
