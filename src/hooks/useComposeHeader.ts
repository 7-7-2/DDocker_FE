import { useLayoutEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  headerLeftState,
  headerRightState,
  headerTextState
} from '@/atoms/atoms';
import { HeaderType } from '@/types/types';

export const useComposeHeader = <T extends HeaderType>(
  left: T['left'] = '',
  text: T['text'] = '',
  right: T['right'] = ''
) => {
  const setLeftState = useSetRecoilState(headerLeftState);
  const setTextState = useSetRecoilState(headerTextState);
  const setRightState = useSetRecoilState(headerRightState);

  useLayoutEffect(() => {
    setLeftState(left);
    setTextState(text);
    setRightState(right);
  }, [text]);

  return null;
};
