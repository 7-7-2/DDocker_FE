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
  const remained = caffeineSum !== undefined && 400 - caffeineSum;
  const over = remained && remained > 0;
  const notCounsumed = allCount === 0;

  return (
    <div>
      <div className={Column}>
        <span>
          {user?.nickname}
          {signedIn.sir}
        </span>
        {!notCounsumed && <span>{over ? sub.default[0] : sub.over[0]}</span>}
        <div>
          <EmphasizeText className={Bold}>
            {notCounsumed
              ? emphasize.notCounsumed
              : over
                ? `${remained}${emphasize.default}`
                : emphasize.over}
          </EmphasizeText>
          <span>
            {notCounsumed
              ? sub.notCounsumed[0]
              : over
                ? sub.default[1]
                : sub.over[1]}
          </span>
        </div>
        <span>{notCounsumed && sub.notCounsumed[1]}</span>
      </div>
    </div>
  );
};

const EmphasizeText = styled.span`
  color: var(--colors-main);
`;

export default TodayCaffeineTitle;
