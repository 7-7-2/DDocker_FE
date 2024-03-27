import { useRecoilValue } from 'recoil';
import AlertBubble from '@/components/common/AlertBubble';
import { TODAY_CAFFEINE_INFO_TEXTS } from '@/constants/home';
import { authState, takedWaterState, userInfoState } from '@/atoms/atoms';
import useGetTodayCoffeeData from '@/hooks/useGetTodayCoffeeData';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { HomeHeaderContent } from '@/styles/styles';
import { Align, Between, Column } from '@/styles/layout';

const { anonymous, signedIn } = TODAY_CAFFEINE_INFO_TEXTS;

const TodayCaffeineText = () => {
  const takedWater = useRecoilValue(takedWaterState);
  const userInfo = useRecoilValue(authState);
  const user = useRecoilValue(userInfoState);
  const todayCoffeeData = user && useGetTodayCoffeeData();
  const allCount = todayCoffeeData?.allCount;

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

  const waterPerCoffeeCount = allCount && allCount * 2 - takedWater;

  const signedInMessage = (
    <div>
      {signedIn.messageText.first}
      {waterPerCoffeeCount ? ` ${waterPerCoffeeCount}` : null}
      {waterPerCoffeeCount
        ? signedIn.messageText.second
        : signedIn.messageText.third}
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
      {allCount && allCount >= 1 ? (
        <AlertBubble message={signedInMessage} />
      ) : (
        <AlertBubble message={anonymous.messageText} />
      )}
    </div>
  );
};

const CaffeineInfo = styled.span`
  color: var(--colors-main);
`;

export default TodayCaffeineText;
