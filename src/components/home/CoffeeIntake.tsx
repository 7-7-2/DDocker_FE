import {
  CAFFEINE_PER_WATER_TEXTS,
  CAFFEINE_INFO_TEXTS
} from '@/constants/home';
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
import { TodayCoffeeInfoTypes } from '@/types/types';

const { coffeeIntake } = CAFFEINE_PER_WATER_TEXTS;
const { unit } = CAFFEINE_INFO_TEXTS;

const CoffeeIntake = ({ data }: { data: TodayCoffeeInfoTypes | undefined }) => {
  const percentage =
    data?.caffeineSum && data?.caffeineSum / 4 <= 100
      ? data?.caffeineSum / 4
      : 100;

  return (
    <div>
      <div className={CaffeineDetail}>{coffeeIntake.title}</div>
      <div className={HomeContent}>
        <span className={HomeContentBigNum}>{data?.caffeineSum}</span>
        {unit}
        <span className={HomeContentNum}>
          {' '}
          /{data?.allCount}
          {coffeeIntake.unit}
        </span>
      </div>
      <div className={InputByteCheck}>{coffeeIntake.subTitle}</div>
      <div className={FlexCenter}>
        <ProgressBar>
          <Progress style={{ width: `${percentage}%` }} />
        </ProgressBar>
        <div className={cx(InputByteCheck, recommended)}>
          {coffeeIntake.recommended}
          {unit}
        </div>
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
  height: 5px;
  border-radius: 5px;
  background-color: var(--colors-main);
`;

const recommended = css`
  color: var(--colors-mid-grey);
`;

export default CoffeeIntake;
