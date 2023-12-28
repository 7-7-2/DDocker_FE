import { useRecoilValue } from 'recoil';
import { useLayoutEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';

import { authState } from '@/atoms/atoms';
import Icon from '@/components/common/Icon';
import { TODAY_CAFFEINE_INFO_TEXTS } from '@/constants/home';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import useGetCacheData from '@/hooks/useGetCacheData';
import { getUserInfo } from '@/api/user';
import { getTodayCoffeeInfo } from '@/api/post';
import { UserCachedData } from '@/types/types';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Between, Column, Flex } from '@/styles/layout';
import { Regular } from '@/styles/styles';

const { anonymous, signedIn } = TODAY_CAFFEINE_INFO_TEXTS;

const TodayCaffeineText = () => {
  const [cachedUser, setCachedUser] = useState<UserCachedData>();
  const [dataList, setDataList] = useState<DocumentData[]>([]);
  const userInfo = useRecoilValue(authState);

  const getCachedUserInfo = async () => {
    const data = await useGetCacheData('user', '/user');
    setCachedUser(data);
  };

  const getDataList = async () => {
    const dataList = await getTodayCoffeeInfo();
    setDataList(dataList);
  };

  const user = cachedUser?.cacheData;

  useLayoutEffect(() => {
    getUserInfo();
    getCachedUserInfo();
    getDataList();
  }, []);

  const anonymousText = !user && (
    <div className={Column}>
      <span>{anonymous.first}</span>
      <span>{anonymous.second}</span>
      <span>{anonymous.third}</span>
    </div>
  );

  const signedInText = (
    <div className={Column}>
      <span>
        {user ? user?.user.nickname : userInfo.user.nickname}
        {signedIn.first}
      </span>
      <div>
        <CaffeineInfo>총 {user?.accumualted || 0}mg</CaffeineInfo>
        {signedIn.second}
      </div>
      <span>{signedIn.third}</span>
    </div>
  );

  const signedInMessage = (
    <div>
      {signedIn.messageText.first}
      {dataList && dataList.length * 2}
      {signedIn.messageText.second}
    </div>
  );

  return (
    <TodayCaffeineInfoContainer>
      <div className={cx(Flex, Align, Between)}>
        {user?.signIn ? signedInText : anonymousText}
        <img
          src="/png/coffee_mainimg.png"
          alt="coffee"
        />
      </div>
      <MessageContainer className={cx(Align)}>
        <Icon {...iconPropsGenerator('message', '15')} />
        <MessageText className={Regular}>
          {dataList && dataList.length >= 1
            ? signedInMessage
            : anonymous.messageText}
        </MessageText>
      </MessageContainer>
    </TodayCaffeineInfoContainer>
  );
};

const TodayCaffeineInfoContainer = styled.div`
  font-size: var(--font-size-xl);
  font-weight: 500;
  line-height: 28px;
`;

const CaffeineInfo = styled.span`
  color: var(--colors-main);
`;

const MessageContainer = styled.div`
  padding: 0 16px;
  margin-top: 10px;
  height: 54px;
  background-color: var(--colors-main);
  color: #fff;
  border-radius: 16px;
  font-size: var(--font-sizes-sm);
`;

const MessageText = styled.div`
  margin-left: 12px;
`;

export default TodayCaffeineText;
