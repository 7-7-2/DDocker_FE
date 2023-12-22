import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CAFFEINE_INFO_TEXTS } from '@/constants/home';
import {
  caffeineFilterState,
  selectedMenuInfoState,
  selectedMenuState
} from '@/atoms/atoms';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Medium, Semibold } from '@/styles/styles';
import { Align, Between, Flex } from '@/styles/layout';

const CaffeineInfo = () => {
  const selectedMenu = useRecoilValue(selectedMenuState);
  const seledctedCaffeineInfo = useRecoilValue(selectedMenuInfoState);
  const [caffeine, setCaffeine] = useRecoilState(caffeineFilterState);

  useEffect(() => {
    setCaffeine({
      caffeine: seledctedCaffeineInfo.caffeine,
      menuCaffeine: seledctedCaffeineInfo.caffeine
    });
  }, [selectedMenu]);

  return (
    <Container className={cx(Flex, Between, Medium, Align)}>
      <span>{CAFFEINE_INFO_TEXTS.title}</span>
      <Caffeine className={Semibold}>{caffeine.caffeine}mg</Caffeine>
    </Container>
  );
};

const Container = styled.div`
  margin: 16px 0 12px;
  border-top: 1px solid #ccc;
  padding: 14px;
  color: #313131;
  font-size: var(--font-sizes-base);
  line-height: 24px;
`;

const Caffeine = styled.span`
  color: var(--colors-main);
  font-size: var(--font-sizes-xl);
  line-height: 28px;
`;

export default CaffeineInfo;
