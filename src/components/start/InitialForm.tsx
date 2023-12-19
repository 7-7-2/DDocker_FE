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
  Regular,
  Semibold,
  StartPageContainer
} from '@/styles/styles';

const { message } = INITIAL_FORM_TEXTS;

const InitialForm = () => {
  useComposeHeader(false, '기본정보', 'close');

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
        onTouchEnd={useNavigateTo('/Start/3')}
        className={DefaultBtn}
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
