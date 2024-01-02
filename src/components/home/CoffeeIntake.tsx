import { DocumentData } from 'firebase/firestore';
import { CAFFEINE_PER_WATER_TEXTS } from '@/constants/home';
import { FlexCenter } from '@/styles/layout';
import {
  CaffeineDetail,
  HomeContent,
  HomeContentBigNum,
  HomeContentNum,
  InputByteCheck
} from '@/styles/styles';
import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const { coffeeIntake } = CAFFEINE_PER_WATER_TEXTS;

const CoffeeIntake = ({ data }: { data: DocumentData[] }) => {
  const todayCaffeine = data.map(item => item.caffeine);
  const allCaffeine = todayCaffeine.reduce((acc, cur) => acc + cur);

  return (
    <div>
      <div className={CaffeineDetail}>{coffeeIntake.title}</div>
      <div className={HomeContent}>
        <span className={HomeContentBigNum}>{allCaffeine}</span>mg
        <span className={HomeContentNum}> /{data.length}잔</span>
      </div>
      <div className={InputByteCheck}>{coffeeIntake.subTitle}</div>
      <div className={FlexCenter}>
        <ProgressBar>
          <Progress />
        </ProgressBar>
        <div className={cx(InputByteCheck, recommended)}>400mg</div>
      </div>
    </div>
  );
};

const ProgressBar = styled.div`
  position: relative;
  margin-right: 10px;
  width: 100px;
  height: 5px;
  border-radius: 5px;
  background-color: #f1f1f1;
`;
const Progress = styled.div`
  position: absolute;
  width: 40%;
  height: 5px;
  border-radius: 5px;
  background-color: var(--colors-main);
`;
const recommended = css`
  color: #767676;
`;

export default CoffeeIntake;
