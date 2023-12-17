import { useRecoilState, useRecoilValue } from 'recoil';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { INPUT_TEXTS } from '@/constants/common';
import { LABEL_TEXTS } from '@/constants/common';
import {
  inputNicknameState,
  inputNicknameAlertState,
  authState
} from '@/atoms/atoms';
import useSetUserInitialInfo from '@/hooks/useSetUserInitialInfo';

const CheckNickname = () => {
  const { nickname } = INPUT_TEXTS.type;
  const { user } = useRecoilValue(authState);
  const [inputValue, setInputValue] = useRecoilState(inputNicknameState);
  const [isAlert, setIsAlert] = useRecoilState(inputNicknameAlertState);
  const setInitialInfo = useSetUserInitialInfo();

  const cilckIdCheckBtn = () => {
    setInitialInfo(inputValue, user.brand, user.gender);
    setIsAlert(true);
  };

  return (
    <div>
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
      />
    </div>
  );
};

export default CheckNickname;
