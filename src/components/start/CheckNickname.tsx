import { useRecoilState } from 'recoil';
import { checkNickname } from '@/api/user';
import { CheckNicknameState, authState } from '@/atoms/atoms';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import { INPUT_TEXTS } from '@/constants/common';
import { LABEL_TEXTS } from '@/constants/common';
import { useInput } from '@/hooks/useInput';
import useValidateNickname from '@/hooks/useValidateNickname';

const { nickname } = INPUT_TEXTS.type;
const { message } = LABEL_TEXTS.nickname;

const CheckNickname = ({ userNickname }: { userNickname?: string }) => {
  const [userInit, setUserInit] = useRecoilState(authState);
  const [isApproval, setIsapproval] = useRecoilState(CheckNicknameState);
  const { value, onChange: handleChange } = useInput(userNickname);

  const validate = useValidateNickname(value);

  const cilckIdCheckBtn = async () => {
    try {
      const res = validate && (await checkNickname(value));
      res === 1 ? setIsapproval(false) : setIsapproval(res);

      validate
        ? setUserInit({ ...userInit, nickname: value })
        : setUserInit({ ...userInit, nickname: '' });
    } catch (error) {
      console.log(error);
    }
  };

  const allertMessage = !validate
    ? message.validate
    : isApproval
      ? message.approval
      : isApproval !== null
        ? message.disapproval
        : undefined;

  return (
    <div>
      <Label
        label={LABEL_TEXTS.nickname.label}
        message={allertMessage}
        inputValue={value}
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
