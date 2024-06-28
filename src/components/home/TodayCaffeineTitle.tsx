import { useRecoilValue } from 'recoil';
import { userInfoState } from '@/atoms/atoms';
import { TODAY_CAFFEINE_INFO_TEXTS } from '@/constants/home';
import { Column } from '@/styles/layout';
import { Bold } from '@/styles/styles';
import { styled } from 'styled-system/jsx';

const { signedIn } = TODAY_CAFFEINE_INFO_TEXTS;
const { emphasize, sub } = signedIn;

const TodayCaffeineTitle = ({
  allCount,
  caffeineSum
}: {
  allCount: number | undefined;
  caffeineSum: number | undefined;
}) => {
  const user = useRecoilValue(userInfoState);
  const remained = caffeineSum && 400 - caffeineSum;
  const over = remained && remained > 0;

  return (
    <div>
      <div className={Column}>
        <span>
          {user?.nickname}
          {signedIn.sir}
        </span>
        {allCount && <span>{over ? sub.default[0] : sub.over[0]}</span>}
        <div>
          <CaffeineInfo className={Bold}>
            {!allCount
              ? emphasize.notCounsumed
              : over
                ? `${remained}${emphasize.default}`
                : emphasize.over}
          </CaffeineInfo>
          <span>
            {!allCount
              ? sub.notCounsumed[0]
              : over
                ? sub.default[1]
                : sub.over[1]}
          </span>
        </div>
        <span>{!allCount && sub.notCounsumed[1]}</span>
      </div>
    </div>
  );
};

const CaffeineInfo = styled.span`
  color: var(--colors-main);
`;

export default TodayCaffeineTitle;
