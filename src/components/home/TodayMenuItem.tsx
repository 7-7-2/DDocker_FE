import { Flex } from '@/styles/layout';
import { testMenu } from '@/types/types';
import { styled } from 'styled-system/jsx';

const TodayMenuItem = (data: { data: testMenu }) => {
  console.log(data.data.brand);
  return (
    <div className={Flex}>
      <IconCotainer>{data.data.icon}</IconCotainer>
      <span>{data.data.caffeine}</span>
      <span>{data.data.brand}</span>
    </div>
  );
};

export default TodayMenuItem;

const IconCotainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: aliceblue;
`;
