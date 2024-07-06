import { useRecoilValue } from 'recoil';
import { caffeineFilterState } from '@/atoms/atoms';
import { CAFFEINE_INFO_TEXTS } from '@/constants/home';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { HomeInfoCaffeine, Semibold } from '@/styles/styles';
import { Align, Between } from '@/styles/layout';

const CaffeineInfo = () => {
  const { caffeine } = useRecoilValue(caffeineFilterState);
  return (
    <Container className={cx(Between, Align, Semibold)}>
      <Title>{CAFFEINE_INFO_TEXTS.title}</Title>
      <span className={HomeInfoCaffeine}>
        {caffeine > 0 ? caffeine : 0}
        {CAFFEINE_INFO_TEXTS.unit}
      </span>
    </Container>
  );
};

const Title = styled.span`
  font-size: var(--font-sizes-base);
  line-height: 24px;
  color: var(--colors-main-dark);
`;
const Container = styled.div`
  margin: 22px 3px 28px;
`;

export default CaffeineInfo;
