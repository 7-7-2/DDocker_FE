import { Label } from '@/components/common/Label';
import { LABEL_TEXTS } from '@/constants/common';
import { SIGININ_TEXTS } from '@/constants/start';
import { styled } from 'styled-system/jsx';
import { Regular, Semibold } from '@/styles/styles';
import { CheckNickname } from '@/components/start/CheckNickname';

const InitialForm = () => {
  const { message } = SIGININ_TEXTS.initialForm;

  return (
    <div>
      <InitialFormText className={Regular}>
        {message.first}
        <br />
        <span className={Semibold}>{message.profile}</span>
        {message.second}
      </InitialFormText>
      <div>ProfileContainer</div>
      <CheckNickname />
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
