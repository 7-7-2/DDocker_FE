import { useLayoutEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  headerLogoState,
  headerTextState,
  headerIconsState
} from '@/atoms/atoms';
import { HeaderType } from '@/types/types';

export const useComposeHeader = <T extends HeaderType>(
  logo: T['logo'] = false,
  text: T['text'] = '',
  icon: T['icon'] = ''
) => {
  const setLogoState = useSetRecoilState(headerLogoState);
  const setTextState = useSetRecoilState(headerTextState);
  const setIconsState = useSetRecoilState(headerIconsState);

  useLayoutEffect(() => {
    setLogoState(logo);
    setTextState(text);
    setIconsState(icon);
  }, [text]);

  return null;
};
