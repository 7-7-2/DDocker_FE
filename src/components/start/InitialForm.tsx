import { INITIAL_FORM_TEXTS } from '@/constants/start';
import SelectGender from '@/components/start/SelectGender';
import CheckNickname from '@/components/start/CheckNickname';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import Button from '@/components/common/Button';
import { styled } from 'styled-system/jsx';
import { Column } from '@/styles/layout';
import {
  DefaultBtn,
  Regular,
  Semibold,
  StartPageContiner
} from '@/styles/styles';
import { BUTTON_TEXTS } from '@/constants/common';
import { useComposeHeader } from '@/hooks/useComposeHeader';

const InitialForm = () => {
  const { message } = INITIAL_FORM_TEXTS;
  useComposeHeader(false, '기본정보', 'close');

  return (
    <div className={Column}>
      <div className={StartPageContiner}>
        <InitialFormText className={Regular}>
          {message.first}
          <br />
          <span className={Semibold}>{message.profile}</span>
          {message.second}
        </InitialFormText>
        <div>ProfileContainer</div>
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

export default InitialForm;

const InitialFormText = styled.div`
  margin-top: 28px;
  color: #313131;
  font-size: var(--font-sizes-xxl);
  line-height: 32px;
`;
