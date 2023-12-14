import { useRecoilState } from 'recoil';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { inputNicknameState, inputNicknameAlertState } from '@/atoms/atoms';
import { LABEL_TEXTS, INPUT_TEXTS } from '@/constants/common';

const InitialForm = () => {
  const { nickname } = INPUT_TEXTS.type;
  const [inputValue, setInputValue] = useRecoilState(inputNicknameState);
  const [isAlert, setIsAlert] = useRecoilState(inputNicknameAlertState);

  const cilckIdCheckBtn = () => {
    console.log('check', inputValue);
    setIsAlert(true);
  };

  return (
    <div>
      <div>
        환영합니다! <br />
        <span>프로필</span>을 등록해 보세요!
      </div>
      <div>ProfileContainer</div>
      <Label
        label={LABEL_TEXTS.nickname.label}
        message={LABEL_TEXTS.nickname.message}
        isAlert={isAlert}
        inputValue={inputValue}
      />
      <Input
        setIsAlert={setIsAlert}
        type={nickname.typeName}
        handleEvent={cilckIdCheckBtn}
        inputValue={inputValue}
        setInputValue={setInputValue}
        btn
      />
    </div>
  );
};

export default InitialForm;
