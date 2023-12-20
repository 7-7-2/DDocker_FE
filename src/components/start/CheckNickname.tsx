import { useRecoilState, useRecoilValue } from 'recoil';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { INPUT_TEXTS } from '@/constants/common';
import { LABEL_TEXTS } from '@/constants/common';
import {
  inputNicknameAlertState,
  authState,
  useInputState
} from '@/atoms/atoms';
import useSetUserInitialInfo from '@/hooks/useSetUserInitialInfo';
import { getNicknameList } from '@/api/user';
import { useState } from 'react';

const { nickname } = INPUT_TEXTS.type;

const CheckNickname = () => {
  const { user } = useRecoilValue(authState);
  const inputValue = useRecoilValue(useInputState);
  const [isAlert, setIsAlert] = useRecoilState(inputNicknameAlertState);
  const [isApproval, setIsapproval] = useState(false);
  const setInitialInfo = useSetUserInitialInfo();

  const cilckIdCheckBtn = async () => {
    setTimeout(async () => {
      setIsAlert(true);
    }, 500);
    clearTimeout;
    const checkIsApproval = async () => {
      const nicknameList = await getNicknameList();
      return nicknameList && !nicknameList.includes(inputValue);
    };

    setIsapproval(await checkIsApproval());
    !isApproval && setInitialInfo(inputValue, user.brand, user.gender);
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
