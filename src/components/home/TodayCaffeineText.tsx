import { useLayoutEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
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
  const [allCount, setAllCount] = useState<number>();
  const userInfo = useRecoilValue(authState);

  const getCachedUserInfo = async () => {
    const data = await useGetCacheData('user', '/userInfo');
    setCachedUser(data);
  };

  const getDataList = async () => {
    const data = await useGetCacheData('user', '/coffee');
    setAllCount(data.cacheData.allCount);
  };

  const user = cachedUser?.cacheData.data;

  // getTodaycoffeeInfo fatching 수정 예정
  useLayoutEffect(() => {
    getCachedUserInfo();
    getDataList();
    // getTodayCoffeeInfo();
  }, []);

  const anonymousText = !user?.nickname && (
    <div className={Column}>
      <span>{anonymous.first}</span>
      <span>{anonymous.second}</span>
      <span>{anonymous.third}</span>
    </div>
  );

  const signedInText = (
    <div className={Column}>
      <span>
        {user ? user?.nickname : userInfo.nickname}
        {signedIn.first}
      </span>
      <div>
        <CaffeineInfo>총 {user?.sum || 0}mg</CaffeineInfo>
        {signedIn.second}
      </div>
      <span>{signedIn.third}</span>
    </div>
  );

  const signedInMessage = (
    <div>
      {signedIn.messageText.first}
      {allCount && allCount * 2}
      {signedIn.messageText.second}
    </div>
  );

  return (
    <div className={HomeHeaderContent}>
      <div className={cx(Align, Between)}>
        {user?.nickname ? signedInText : anonymousText}
        <img
          src="/png/coffee_mainimg.png"
          alt="coffee"
        />
      </div>
      <MessageContainer className={cx(Align)}>
        <Icon {...iconPropsGenerator('message', '15')} />
        <MessageText className={InputFontSm}>
          {allCount && allCount >= 1 ? signedInMessage : anonymous.messageText}
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
