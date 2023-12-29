import Icon from '@/components/common/Icon';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { FlexCenter } from '@/styles/layout';
import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const WaterIntake = () => {
  return (
    <Container className={FlexCenter}>
      <div className={cx(progress, FlexCenter)}>
        <img
          src="/png/waterCup.png"
          alt="water"
        />
        <IconContainer>
          <Icon {...iconPropsGenerator('plus')} />
        </IconContainer>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 106px;
  height: 106px;
  border-radius: 50%;
  background-color: aliceblue;
`;

const progress = css`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: #ffffff;
`;

const IconContainer = styled.div`
  position: absolute;
  right: 30px;
  bottom: 25px;
`;

export default WaterIntake;
