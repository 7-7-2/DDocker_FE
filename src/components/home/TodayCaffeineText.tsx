import { useRecoilValue } from 'recoil';
import { authState } from '@/atoms/atoms';
import Icon from '@/components/common/Icon';
import { TODAY_CAFFEINE_INFO_TEXTS } from '@/constants/home';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Between, Column, Flex, Justify } from '@/styles/layout';

const TodayCaffeineText = ({ accessToken }: { accessToken: string | null }) => {
  const { anonymous, signedIn } = TODAY_CAFFEINE_INFO_TEXTS;
  const { user } = useRecoilValue(authState);

  const testdata = 2;

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
        {user.nickname}
        {signedIn.first}
      </span>
      <div>
        총<CaffeineInfo>27,689mg</CaffeineInfo>
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
      <MessageContainer className={cx(Align, Justify)}>
        <Icon {...iconPropsGenerator('message', '15')} />
        <MessageText>
          {accessToken ? signedInMessage : anonymous.messageText}
        </MessageText>
      </MessageContainer>
    </TodayCaffeineInfoContainer>
  );
};

export default TodayCaffeineText;

const TodayCaffeineInfoContainer = styled.div`
  font-size: var(--font-size-xl);
  font-weight: 500;
  line-height: 28px;
`;
const CaffeineInfo = styled.span`
  color: var(--colors-main);
`;
const MessageContainer = styled.div`
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
