import { CAFFEINE_INFO_TEXTS } from '@/constants/home';
import { Align, Between } from '@/styles/layout';
import { HomeRegistContainer, HomeInfoCaffeine } from '@/styles/styles';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const CaffeineInfo = () => {
  return (
    <Container className={cx(Between, HomeRegistContainer, Align)}>
      <span>{CAFFEINE_INFO_TEXTS.title}</span>
      <span className={HomeInfoCaffeine}>0mg</span>
    </Container>
  );
};

const Container = styled.div`
  margin: 16px 0 12px;
  border-top: 1px solid #ccc;
  padding: 14px;
`;

export default CaffeineInfo;
