import { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { DocumentData } from 'firebase/firestore';
import { getUserInfo } from '@/api/user';
import { getTodayCoffeeInfo } from '@/api/post';
import { authState } from '@/atoms/atoms';
import Icon from '@/components/common/Icon';
import { TODAY_CAFFEINE_INFO_TEXTS } from '@/constants/home';
import useGetCacheData from '@/hooks/useGetCacheData';
import { UserCachedData } from '@/types/types';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import { Align, Between, Column } from '@/styles/layout';
import { HomeHeaderContent, InputFontSm } from '@/styles/styles';

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
    <div className={HomeHeaderContent}>
      <div className={cx(Align, Between)}>
        {user?.signIn ? signedInText : anonymousText}
        <img
          src="/png/coffee_mainimg.png"
          alt="coffee"
        />
      </div>
      <MessageContainer className={cx(Align)}>
        <Icon {...iconPropsGenerator('message', '15')} />
        <MessageText className={InputFontSm}>
          {dataList && dataList.length >= 1
            ? signedInMessage
            : anonymous.messageText}
        </MessageText>
      </MessageContainer>
    </div>
  );
};

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
`;
const MessageText = styled.div`
  margin-left: 12px;
`;

export default TodayCaffeineText;
