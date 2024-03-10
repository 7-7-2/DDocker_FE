import { INPUT_TEXTS } from '@/constants/common';
import { PaddingTB10 } from '@/styles/styles';
import { Input } from '@/components/common/Input';
import { RefObject } from 'react';
import { useInput } from '@/hooks/useInput';
import { memo } from 'react';

const { type } = INPUT_TEXTS;
const { comment } = type;

const PostInput = memo(
  ({ inputRef }: { inputRef: RefObject<HTMLInputElement> }) => {
    const { value, onChange } = useInput();
    const handleSubmit = () => {};

    return (
      <div className={PaddingTB10}>
        <Input
          type={comment.typeName}
          handleEvent={handleSubmit}
          inputRef={inputRef}
          inputValue={value}
          handleChange={onChange}
        />
      </div>
    );
  }
);

export default PostInput;
