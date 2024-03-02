import { useRecoilValue } from 'recoil';
import { caffeineFilterState } from '@/atoms/atoms';
import { CAFFEINE_INFO_TEXTS } from '@/constants/home';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { HomeRegistContainer, HomeInfoCaffeine } from '@/styles/styles';
import { Align, Between } from '@/styles/layout';

const CaffeineInfo = () => {
  const { caffeine } = useRecoilValue(caffeineFilterState);

  return (
    <Container className={cx(Between, HomeRegistContainer, Align)}>
      <span>{CAFFEINE_INFO_TEXTS.title}</span>
      <span className={HomeInfoCaffeine}>
        {caffeine}
        {CAFFEINE_INFO_TEXTS.unit}
      </span>
    </Container>
  );
};

const Container = styled.div`
  margin: 16px 0 12px;
  border-top: 1px solid #ccc;
  padding: 14px;
`;

export default CaffeineInfo;
