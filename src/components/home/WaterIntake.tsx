import { useRecoilState } from 'recoil';

// progressbar
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Icon from '@/components/common/Icon';
import useSetCacheData from '@/hooks/useSetCacheData';
import useGetCachedWater from '@/hooks/useGetCachedWater';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { takedWaterState } from '@/atoms/atoms';

import { FlexCenter } from '@/styles/layout';
import { styled } from 'styled-system/jsx';

const WaterIntake = ({ coffeeCount }: { coffeeCount: number | undefined }) => {
  const [takedWater, setTakedWater] = useRecoilState(takedWaterState);
  useGetCachedWater();

  const waterPerCoffeeCount = coffeeCount && coffeeCount * 2;

  const percentage =
    waterPerCoffeeCount && (takedWater / waterPerCoffeeCount) * 100;

  const touchPlusIcon = () => {
    if (waterPerCoffeeCount && takedWater < waterPerCoffeeCount)
      setTakedWater(takedWater + 1);
    useSetCacheData('user', '/water', takedWater + 1);
  };

  return (
    <Container className={FlexCenter}>
      <CircularProgressbarWithChildren
        value={percentage || 0}
        styles={{
          path: {
            stroke: `#6AB5FB`,
            strokeLinecap: 'round',
            transition: 'stroke-dashoffset 0.5s ease 0s',
            transformOrigin: 'center center'
          },
          trail: {
            stroke: '#f1f1f1',
            strokeLinecap: 'round'
          }
        }}>
        <img
          src="/png/waterCup.png"
          alt="water"
        />
        <IconContainer onTouchEnd={touchPlusIcon}>
          <Icon {...iconPropsGenerator('plus')} />
        </IconContainer>
      </CircularProgressbarWithChildren>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 106px;
  height: 106px;
  border-radius: 50%;
`;

const IconContainer = styled.button`
  position: absolute;
  right: 30px;
  bottom: 25px;
`;

export default WaterIntake;
