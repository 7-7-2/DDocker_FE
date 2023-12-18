import { Column, Flex } from '@/styles/layout';
import { Semibold } from '@/styles/styles';
import { testMenu } from '@/types/types';
import { css } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const TodayMenuItem = (data: { data: testMenu }) => {
  console.log(data.data.brand);
  return (
    <Container className={Flex}>
      <IconCotainer>{data.data.icon}</IconCotainer>
      <div className={Column}>
        <span className={Semibold}>{data.data.caffeine}mg</span>
        <span className={SmFont}>{data.data.brand}</span>
      </div>
    </Container>
  );
};

export default TodayMenuItem;

const Container = styled.div`
  width: 138px;
  height: 52px;
  border-radius: 50px;
  margin-right: 8px;
  padding: 6px;
  border: 1px solid #ccc;
  background: #fff;
  line-height: 20px;
`;
const IconCotainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: aliceblue;
`;
const SmFont = css`
  font-size: var(--font-sizes-sm);
`;
