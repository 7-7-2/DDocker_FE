import { useState } from 'react';
import { useRecoilState } from 'recoil';
import toast from 'react-hot-toast';

import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';

import { checkNickname } from '@/api/user';
import { CheckNicknameState, authState } from '@/atoms/atoms';
import { useInput } from '@/hooks/useInput';
import { useValidateNickname } from '@/hooks/start/useValidateNickname';

import { INPUT_TEXTS } from '@/constants/common';
import { LABEL_TEXTS } from '@/constants/common';

const { nickname } = INPUT_TEXTS.type;
const { message } = LABEL_TEXTS.nickname;

const CheckNickname = ({ userNickname }: { userNickname?: string }) => {
  const [userInit, setUserInit] = useRecoilState(authState);
  const [isApproval, setIsapproval] = useRecoilState(CheckNicknameState);
  const [initValue, setInitValue] = useState<string>('');
  const { value, onChange: handleChange } = useInput(userNickname);

  const { isInvalid, isInsufficient } = useValidateNickname(value);

  const cilckIdCheckBtn = async () => {
    try {
      const validate = !isInvalid && !isInsufficient;
      const exists = validate && !(await checkNickname(value));
      setIsapproval(exists);
      setInitValue(value);
      validate && exists
        ? setUserInit({ ...userInit, nickname: value })
        : setUserInit({ ...userInit, nickname: '' });
    } catch (error) {
      console.log(error);
    }
  };
  const getAllertMessage = () => {
    if (userNickname !== value && isInsufficient) {
      return message.Insufficien;
    }
    if (!isInsufficient && isInvalid) {
      return message.Invalid;
    }
    if (isApproval && initValue === value) {
      return message.approval;
    }
    if (!isApproval === false && !initValue) {
      return message.disapproval;
    }
    return undefined;
  };

  const allertMessage = getAllertMessage();

  return (
    <div>
      <Label
        label={LABEL_TEXTS.nickname.label}
        message={allertMessage}
        inputValue={value}
        icon={true}
      />
      <Input
        inputValue={value}
        type={nickname.typeName}
        handleEvent={cilckIdCheckBtn}
        handleChange={handleChange}
      />
    </div>
  );
};

export default CheckNickname;
