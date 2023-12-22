import Button from '@/components/common/Button';
import CoffeeIntake from '@/components/home/CoffeeIntake';
import TodayMenuItem from '@/components/home/TodayMenuItem';
import WaterIntake from '@/components/home/WaterIntake';
import { BUTTON_TEXTS } from '@/constants/common';
import { TODAY_CAFFEINE_INFO_TEXTS } from '@/constants/home';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import {
  Align,
  Between,
  Center,
  Column,
  Flex,
  MarginAuto
} from '@/styles/layout';
import { LoginBtn, Medium, Regular } from '@/styles/styles';
import { testData } from '@/types/types';
import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const data: testData = {
  Allcaffeine: 185,
  coffee: 2,
  menu: [
    {
      icon: '',
      brand: '스타벅스',
      caffeine: 185,
      menuName: '아이스아메리카노'
    },
    {
      icon: '',
      brand: '이디야',
      caffeine: 200,
      menuName: '아이스아메리카노'
    }
  ]
};

const WaterPerCoffee = ({ accessToken }: { accessToken: string | null }) => {
  const dataList = data.menu;
  const { anonymous, signedIn } = TODAY_CAFFEINE_INFO_TEXTS;

  const anonymousCard = (
    <div className={cx(Column, Center, MarginAuto)}>
      <span className={cx(AlertMessage, Regular)}>
        {anonymous.card.first} <br /> {anonymous.card.second}
      </span>
      <Button
        text={BUTTON_TEXTS.signin}
        onTouchEnd={useNavigateTo('/start/1')}
        className={cx(LoginBtn, MarginTop)}
      />
    </div>
  );

  const notConsumedCoffee = (
    <div className={cx(Column, Center, MarginAuto)}>
      <span className={cx(AlertMessage, Regular)}>
        {signedIn.card.notConsumed}
      </span>
      <Button
        text={signedIn.btn}
        onTouchEnd={useNavigateTo('/start/1')}
        className={cx(RegistCoffeeBtn, Medium)}
      />
    </div>
  );

  const consumedCoffee = (
    <div>
      <div className={cx(Flex, Between)}>
        <CoffeeIntake data={data} />
        <WaterIntake />
      </div>
      <TodayMenuList className={Flex}>
        {dataList.map(item => (
          <div key={item.brand}>
            <TodayMenuItem data={item} />
          </div>
        ))}
      </TodayMenuList>
    </div>
  );

  return (
    <Containere className={cx(data.coffee ? CosumedCoffee : Default, Align)}>
      {!accessToken && anonymousCard}
      {accessToken && !data.coffee && notConsumedCoffee}
      {accessToken && data.coffee >= 1 && consumedCoffee}
    </Containere>
  );
};

export default WaterPerCoffee;

const Containere = styled.div`
  height: 220px;
  border-radius: 16px;
  margin-top: 16px;
`;

const CosumedCoffee = css`
  background: #fff;
  padding: 20px;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
  color: #313131;
`;

const Default = css`
  border: 1px solid #ccc;
  background: #ebebeb;
  text-align: center;
`;

const TodayMenuList = styled.div`
  margin-top: 25px;
  overflow-x: scroll;
`;

const AlertMessage = css`
  font-size: var(--font-sizes-sm);
  color: #a6a6a6;
  line-height: 22px;
`;

const RegistCoffeeBtn = css`
  color: #767676;
  font-size: var(--font-sizes-xxl);
  line-height: 32px;
`;

const MarginTop = css`
  margin-top: 16px;
`;
