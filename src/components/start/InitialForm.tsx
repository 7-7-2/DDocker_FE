import Button from '@/components/common/Button';
import SelectGender from '@/components/start/SelectGender';
import CheckNickname from '@/components/start/CheckNickname';
import ProfileImg from '@/components/profile/ProfileImg';

import { INITIAL_FORM_TEXTS } from '@/constants/start';
import { BUTTON_TEXTS } from '@/constants/common';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { useComposeHeader } from '@/hooks/useComposeHeader';

import { styled } from 'styled-system/jsx';
import { Column } from '@/styles/layout';
import {
  DefaultBtn,
  DisabledBtn,
  Regular,
  Semibold,
  StartPageContainer
} from '@/styles/styles';
import { authState } from '@/atoms/atoms';
import { useRecoilValue } from 'recoil';
import { cx } from 'styled-system/css';

const { message } = INITIAL_FORM_TEXTS;

const InitialForm = () => {
  useComposeHeader(false, '기본정보', 'close');
  const { user } = useRecoilValue(authState);

  return (
    <div className={Column}>
      <div className={StartPageContainer}>
        <InitialFormText className={Regular}>
          {message.first}
          <br />
          <span className={Semibold}>{message.profile}</span>
          {message.second}
        </InitialFormText>
        <ProfileContainer>
          <ProfileImg edit />
        </ProfileContainer>
        <CheckNickname />
        <SelectGender />
      </div>

      <Button
        text={BUTTON_TEXTS.next}
        onTouchEnd={
          user.nickname && user?.nickname?.length >= 0 && user?.gender
            ? useNavigateTo('/start/3')
            : useNavigateTo('/start/2')
        }
        className={
          user?.nickname && user?.gender
            ? DefaultBtn
            : cx(DefaultBtn, DisabledBtn)
        }
      />
    </div>
  );
};

const InitialFormText = styled.div`
  margin-top: 28px;
  color: #313131;
  font-size: var(--font-sizes-xxl);
  line-height: 32px;
`;

const ProfileContainer = styled.div`
  margin: 50px 36px;
`;

export default InitialForm;
