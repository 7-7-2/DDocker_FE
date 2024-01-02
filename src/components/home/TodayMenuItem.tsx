import { DocumentData } from 'firebase/firestore';
import convertBrandName from '@/utils/convertBrandName';
import { Column, Flex } from '@/styles/layout';
import { RecentSearch, SumType } from '@/styles/styles';
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
        <span className={RecentSearch}>{data.data.caffeine}mg</span>
        <span className={SumType}>{convertBrandName(data.data.brand)}</span>
      </div>
    </Container>
  );
};

const Container = styled.div`
  min-width: 134px;
  height: 52px;
  border-radius: 50px;
  margin-right: 8px;
  padding: 6px;
  border: 1px solid #ccc;
  background: #fff;
`;
const IconCotainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export default TodayMenuItem;
