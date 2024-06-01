import { lazy } from 'react';
import { useRecoilValue } from 'recoil';

import { BUTTON_TEXTS } from '@/constants/common';
import { TODAY_CAFFEINE_INFO_TEXTS } from '@/constants/home';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useGetTodayCoffeeData } from '@/hooks/home/useGetTodayCoffeeData';
import { userInfoState } from '@/atoms/atoms';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import {
  Align,
  Between,
  Center,
  Column,
  Flex,
  MarginAuto
} from '@/styles/layout';
import { RegistCoffeeBtn, AlertMessage, Default } from '@/styles/styles';

const CTA = lazy(() => import('@/components/common/CTA'));
const Button = lazy(() => import('@/components/common/Button'));
const WaterIntake = lazy(() => import('@/components/home/WaterIntake'));
const TodayMenuItem = lazy(() => import('@/components/home/TodayMenuItem'));
const CoffeeIntake = lazy(() => import('@/components/home/CoffeeIntake'));

const { anonymous, signedIn } = TODAY_CAFFEINE_INFO_TEXTS;

const WaterPerCoffee = () => {
  const user = useRecoilValue(userInfoState);
  const { coffeeInfo: todayCoffeeData } = useGetTodayCoffeeData();

  const anonymousCard = (
    <div className={cx(Column, Center, MarginAuto)}>
      <CTA
        text={anonymous.card}
        actionText={BUTTON_TEXTS.signIn1}
        btn={true}
        fn={useNavigateTo('/start/1')}
      />
    </div>
  );

  const notConsumedCoffee = (
    <div className={cx(Column, Center, MarginAuto)}>
      <span className={AlertMessage}>{signedIn.card.notConsumed}</span>
      <Button
        text={signedIn.btn}
        onClick={useNavigateTo('/post/register')}
        className={RegistCoffeeBtn}
      />
    </div>
  );

  const consumedCoffee = (
    <ConsumedCoffeeContainer className={Column}>
      <div className={cx(Flex, Between)}>
        <CoffeeIntake data={todayCoffeeData} />
        <WaterIntake coffeeCount={todayCoffeeData?.allCount} />
      </div>
      <TodayMenuList className={Flex}>
        {todayCoffeeData?.allCount !== null &&
          todayCoffeeData?.item.map((item, idx) => (
            <TodayMenuItem
              data={item}
              key={idx}
            />
          ))}
      </TodayMenuList>
    </ConsumedCoffeeContainer>
  );

  return (
    <Container
      className={cx(
        todayCoffeeData?.allCount && todayCoffeeData?.allCount >= 1
          ? CosumedCoffee
          : Default,
        Align,
        Between
      )}>
      {!user.nickname && anonymousCard}
      {user.nickname && !todayCoffeeData?.allCount && notConsumedCoffee}
      {user.nickname &&
        todayCoffeeData?.allCount &&
        todayCoffeeData?.allCount >= 1 &&
        consumedCoffee}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: inherit;
  overflow: hidden;
  height: 220px;
  border-radius: 16px;
  margin-top: 16px;
`;

const ConsumedCoffeeContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
`;

const CosumedCoffee = css`
  background: #fff;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
  color: #313131;
`;

const TodayMenuList = styled.div`
  margin-top: auto;
  overflow-x: scroll;
`;

export default WaterPerCoffee;
