import Icon from '@/components/common/Icon';
import { TODAY_CAFFEINE_INFO_TEXTS } from '@/constants/home';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import useGetCacheData from '@/hooks/useGetCacheData';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Between, Column, Flex } from '@/styles/layout';
import { Regular } from '@/styles/styles';
import { useRecoilValue } from 'recoil';
import { authState } from '@/atoms/atoms';

const { anonymous, signedIn } = TODAY_CAFFEINE_INFO_TEXTS;

const TodayCaffeineText = ({ accessToken }: { accessToken: string | null }) => {
  const testdata = 2;
  const { user: userState } = useRecoilValue(authState);

  const getLocalUserInfo = () => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo && JSON.parse(userInfo);
  };

  // const getCachedUserInfo = async () => {
  //   const data = await useGetCacheData('user', '/user');
  // };

  const user = getLocalUserInfo() || userState;

  const anonymousText = (
    <div className={Column}>
      <span>{anonymous.first}</span>
      <span>{anonymous.second}</span>
      <span>{anonymous.third}</span>
    </div>
  );

  const signedInText = (
    <div className={Column}>
      <span>
        {user?.user.nickname}
        {signedIn.first}
      </span>
      <div>
        <CaffeineInfo>총 27,689mg</CaffeineInfo>
        {signedIn.second}
      </div>
      <span>{signedIn.third}</span>
    </div>
  );

  const signedInMessage = (
    <div>
      {signedIn.messageText.first}
      {testdata}
      {signedIn.messageText.second}
    </div>
  );

  return (
    <TodayCaffeineInfoContainer>
      <div className={cx(Flex, Align, Between)}>
        {accessToken ? signedInText : anonymousText}
        <img
          src="/coffee_mainimg.png"
          alt="coffee"
        />
      </div>
      <MessageContainer className={cx(Align)}>
        <Icon {...iconPropsGenerator('message', '15')} />
        <MessageText className={Regular}>
          {accessToken ? signedInMessage : anonymous.messageText}
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
