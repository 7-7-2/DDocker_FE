import { Input } from '@/components/common/Input';
import { INPUT_TEXTS } from '@/constants/common';
import { useInput } from '@/hooks/useInput';
import { css } from 'styled-system/css';

export default function PostInputTitle({
  inputRef
}: {
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  const { value, onChange: handleChange } = useInput();

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
