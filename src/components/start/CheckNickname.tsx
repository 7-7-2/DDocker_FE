import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { checkNickname } from '@/api/user';
import {
  inputNicknameAlertState,
  authState,
  useInputState
} from '@/atoms/atoms';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { INPUT_TEXTS } from '@/constants/common';
import { LABEL_TEXTS } from '@/constants/common';

const { nickname } = INPUT_TEXTS.type;

const CheckNickname = () => {
  const user = useRecoilValue(authState);
  const inputValue = useRecoilValue(useInputState);
  const [isAlert, setIsAlert] = useRecoilState(inputNicknameAlertState);
  const [isApproval, setIsapproval] = useState(false);
  const [userInit, setUserInit] = useRecoilState(authState);

  const cilckIdCheckBtn = async () => {
    try {
      const res = await checkNickname(inputValue);
      res === 1 ? setIsapproval(false) : setIsapproval(res);
      setIsAlert(true);

      const selectedNickname = {
        ...userInit,
        nickname: inputValue
      };

      if (isApproval) {
        isApproval && setUserInit(selectedNickname);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const allertMessage = isApproval
    ? LABEL_TEXTS.nickname.message.approval
    : LABEL_TEXTS.nickname.message.disapproval;

  return (
    <div>
      <Label
        label={LABEL_TEXTS.nickname.label}
        message={allertMessage}
        isAlert={isAlert}
        inputValue={inputValue}
      />
      <Input
        type={nickname.typeName}
        handleEvent={cilckIdCheckBtn}
      />
    </div>
  );
};

export default CheckNickname;
