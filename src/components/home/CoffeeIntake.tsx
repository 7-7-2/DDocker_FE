import { CAFFEINE_PER_WATER_TEXTS } from '@/constants/home';
import { Align, Flex } from '@/styles/layout';
import { Bold, Regular, Semibold } from '@/styles/styles';
import { testData } from '@/types/types';
import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const CoffeeIntake = ({ data }: { data: testData }) => {
  const { coffeeIntake } = CAFFEINE_PER_WATER_TEXTS;
  return (
    <div>
      <Title className={Regular}>{coffeeIntake.title}</Title>
      <ContentContainer className={Semibold}>
        <CaffeineNum className={Bold}>{data.Allcaffeine}</CaffeineNum>mg
        <CoffeeNum> /{data.coffee}잔</CoffeeNum>
      </ContentContainer>
      <div className={CaffeineProgress}>{coffeeIntake.subTitle}</div>
      <div className={cx(Flex, Align)}>
        <ProgressBar>
          <Progress></Progress>
        </ProgressBar>
        <div className={cx(CaffeineProgress, recommended)}>400mg</div>
      </div>
    </div>
  );
};

export default CoffeeIntake;

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
const Title = styled.div`
  font-size: var(--font-sizes-sm);
`;

const CaffeineNum = styled.span`
  font-size: var(--font-sizes-xxl);
  line-height: 40px;
`;

const CoffeeNum = styled.span`
  color: #313131;
`;

const ContentContainer = styled.div`
  color: var(--main, #ff701e);
`;

const CaffeineProgress = css`
  font-size: var(--font-sizes-sm);
`;
const recommended = css`
  color: #767676;
`;
