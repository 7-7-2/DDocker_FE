import Icon from '@/components/common/Icon';
import { Column, Flex } from '@/styles/layout';
import { Semibold } from '@/styles/styles';
import { testMenu } from '@/types/types';
import convertBrandName from '@/utils/convertBrandName';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { DocumentData } from 'firebase/firestore';
import { css } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const TodayMenuItem = (data: { data: DocumentData }) => {
  const icon = `/png/${data.data.brand}.png`;

  return (
    <Container className={Flex}>
      <IconCotainer>
        <img
          src={icon}
          alt={data.data.brand}
        />
      </IconCotainer>
      <div className={Column}>
        <span className={Semibold}>{data.data.caffeine}mg</span>
        <span className={SmFont}>{convertBrandName(data.data.brand)}</span>
      </div>
    </Container>
  );
};

export default TodayMenuItem;

const Container = styled.div`
  min-width: 134px;
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
`;
const SmFont = css`
  font-size: var(--font-sizes-sm);
`;
