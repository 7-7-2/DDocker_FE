import { registPostState } from '@/atoms/atoms';
import { Input } from '@/components/common/Input';
import { INPUT_TEXTS } from '@/constants/common';
import { useInput } from '@/hooks/useInput';
import { useRecoilValue } from 'recoil';
import { css } from 'styled-system/css';

export default function PostInputTitle({
  inputRef
}: {
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  const { post_title } = useRecoilValue(registPostState);
  const { value, onChange: handleChange } = useInput(post_title);

  return (
    <div className={MarginTop6}>
      <Input
        type={INPUT_TEXTS.type.title.typeName}
        inputRef={inputRef}
        inputValue={value}
        handleChange={handleChange}
      />
    </div>
  );
}

const MarginTop6 = css`
  margin-top: 6px;
`;
