import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  caffeineFilterState,
  selectedMenuInfoState,
  selectedMenuState
} from '@/atoms/atoms';
import { CAFFEINE_INFO_TEXTS } from '@/constants/home';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { HomeRegistContainer, HomeInfoCaffeine } from '@/styles/styles';
import { Align, Between } from '@/styles/layout';

const CaffeineInfo = () => {
  const selectedMenu = useRecoilValue(selectedMenuState);
  const seledctedCaffeineInfo = useRecoilValue(selectedMenuInfoState);
  const [caffeine, setCaffeine] = useRecoilState(caffeineFilterState);

  useEffect(() => {
    setCaffeine({
      caffeine: Number(seledctedCaffeineInfo.caffeine),
      menuCaffeine: Number(seledctedCaffeineInfo.caffeine)
    });
  }, [selectedMenu]);

  return (
    <Container className={cx(Between, HomeRegistContainer, Align)}>
      <span>{CAFFEINE_INFO_TEXTS.title}</span>
      <span className={HomeInfoCaffeine}>{caffeine.caffeine}mg</span>
    </Container>
  );
};

const Container = styled.div`
  margin: 16px 0 12px;
  border-top: 1px solid #ccc;
  padding: 14px;
`;

export default CaffeineInfo;
