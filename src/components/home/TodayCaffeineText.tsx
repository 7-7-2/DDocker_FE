import { useRecoilValue } from 'recoil';
import Icon from '@/components/common/Icon';
import { TODAY_CAFFEINE_INFO_TEXTS } from '@/constants/home';
import { authState, takedWaterState, userInfoState } from '@/atoms/atoms';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import useGetTodayCoffeeData from '@/hooks/useGetTodayCoffeeData';

import { HomeHeaderContent, InputFontSm } from '@/styles/styles';
import { Align, Between, Column } from '@/styles/layout';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const { anonymous, signedIn } = TODAY_CAFFEINE_INFO_TEXTS;

const TodayCaffeineText = () => {
  const takedWater = useRecoilValue(takedWaterState);
  const userInfo = useRecoilValue(authState);
  const user = useRecoilValue(userInfoState);
  const todayCoffeeData = useGetTodayCoffeeData();
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
