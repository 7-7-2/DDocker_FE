import { testData } from '@/types/types';
import { styled } from 'styled-system/jsx';

const CoffeeIntake = ({ data }: { data: testData }) => {
  return (
    <div>
      <div>오늘의 카페인 섭취량</div>
      <div>
        {data.Allcaffeine}mg/{data.coffee}잔
      </div>
      <div>일일 섭취 권장량</div>
      <div>400mg</div>
      <ProgressBar>
        <Progress></Progress>
      </ProgressBar>
    </div>
  );
};

export default CoffeeIntake;

const ProgressBar = styled.div`
  position: relative;
  width: 100px;
  height: 10px;
  background-color: aliceblue;
`;
const Progress = styled.div`
  position: absolute;
  width: 40%;
  height: 10px;
  background-color: #152d43;
`;
