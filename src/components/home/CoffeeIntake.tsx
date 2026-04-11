import {
  CAFFEINE_PER_WATER_TEXTS,
  CAFFEINE_INFO_TEXTS
} from '@/constants/home';
import { CAFFEINE_TEXTS } from '@/constants/common';
import { TodayCoffeeInfoTypes } from '@/types/types';

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
const { unit } = CAFFEINE_INFO_TEXTS;

const CoffeeIntake = ({ data }: { data: TodayCoffeeInfoTypes | undefined }) => {
  const todayCaffeine = data && data?.todayCaffeine;
  const colorState = todayCaffeine && todayCaffeine > 400;
  const percentage =
    todayCaffeine && todayCaffeine / 4 <= 100 ? todayCaffeine / 4 : 100;

  return (
    <div>
      <div className={CaffeineDetail}>{coffeeIntake.title}</div>
      <div className={HomeContent}>
        <span
          className={cx(
            HomeContentBigNum,
            colorState ? Excessive : recommended
          )}>
          {todayCaffeine}
        </span>
        {unit}
        <span className={HomeContentNum}>
          {' '}
          /{data?.todayCups}
          {coffeeIntake.unit}
        </span>
      </div>
      <div className={InputByteCheck}>{coffeeIntake.subTitle}</div>
      <div className={FlexCenter}>
        <ProgressBar>
          <Progress
            className={cx(colorState ? ExcessiveBG : recommendedBG)}
            style={{ width: `${percentage}%` }}
          />
        </ProgressBar>
        <RecommendedCaffiene className={cx(InputByteCheck)}>
          {CAFFEINE_TEXTS.recommendedCaffeine}
          {CAFFEINE_TEXTS.unit}
        </RecommendedCaffiene>
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
  /* background-color: var(--colors-main); */
`;

const RecommendedCaffiene = styled.span`
  color: var(--colors-mid-grey);
`;

const Excessive = css`
  color: var(--colors-delete-red);
`;
const ExcessiveBG = css`
  background-color: var(--colors-delete-red);
`;
const recommended = css`
  color: var(--colors-main);
`;
const recommendedBG = css`
  background-color: var(--colors-main);
`;
export default CoffeeIntake;
