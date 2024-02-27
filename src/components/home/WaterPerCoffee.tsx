import { useEffect, useLayoutEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import { getTodayCoffeeInfo } from '@/api/post';
import Button from '@/components/common/Button';
import CoffeeIntake from '@/components/home/CoffeeIntake';
import TodayMenuItem from '@/components/home/TodayMenuItem';
import WaterIntake from '@/components/home/WaterIntake';
import { BUTTON_TEXTS } from '@/constants/common';
import { TODAY_CAFFEINE_INFO_TEXTS } from '@/constants/home';
import { useNavigateTo } from '@/hooks/useNavigateTo';
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
import { LoginBtn, RegistCoffeeBtn, AlertMessage } from '@/styles/styles';
import { CoffeeInfo, UserCachedData } from '@/types/types';
import useGetCacheData from '@/hooks/useGetCacheData';

const { anonymous, signedIn } = TODAY_CAFFEINE_INFO_TEXTS;

const WaterPerCoffee = () => {
  const [cachedUser, setCachedUser] = useState<UserCachedData>();
  const [dataList, setDataList] = useState<CoffeeInfo>();

  const getCachedUserInfo = async () => {
    const data = await useGetCacheData('user', '/userInfo');
    setCachedUser(data);
  };

  const user = cachedUser?.cacheData.data;

  const consumedCoffeList = async () => {
    const data = await useGetCacheData('user', '/coffee');
    if (data.cacheData.allcount !== null) {
      setDataList(data.cacheData);
      return;
    }
  };

  useLayoutEffect(() => {
    consumedCoffeList();
    getCachedUserInfo();
  }, []);

  const anonymousCard = (
    <div className={cx(Column, Center, MarginAuto)}>
      <span className={AlertMessage}>
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
      <span className={AlertMessage}>{signedIn.card.notConsumed}</span>
      <Button
        text={signedIn.btn}
        onTouchEnd={useNavigateTo('/post/register')}
        className={RegistCoffeeBtn}
      />
    </div>
  );

  const consumedCoffee = (
    <div className={Column}>
      <div className={cx(Flex, Between)}>
        <CoffeeIntake data={dataList} />
        <WaterIntake />
      </div>
      <TodayMenuList className={Flex}>
        {dataList?.allCount !== null &&
          dataList?.item.map((item, idx) => (
            <TodayMenuItem
              data={item}
              key={idx}
            />
          ))}
      </TodayMenuList>
    </div>
  );

  return (
    <Container
      className={cx(
        dataList?.item && dataList?.item.length >= 1 ? CosumedCoffee : Default,
        Align,
        Between
      )}>
      {!user && anonymousCard}
      {user && dataList?.allCount === null && notConsumedCoffee}
      {user && dataList?.item && dataList?.item.length >= 1 && consumedCoffee}
    </Container>
  );
};

const Container = styled.div`
  width: inherit;
  height: 220px;
  border-radius: 16px;
  margin-top: 16px;
`;

const CosumedCoffee = css`
  background: #fff;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
  color: #313131;
  padding: 20px;
`;

const TodayMenuList = styled.div`
  width: calc(100vw - 80px);
  margin-top: 25px;
  overflow-x: scroll;
`;

const Default = css`
  border: 1px solid #ccc;
  background: #ebebeb;
  text-align: center;
`;

const MarginTop = css`
  margin-top: 16px;
`;

export default WaterPerCoffee;
