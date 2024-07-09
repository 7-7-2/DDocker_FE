import { useRecoilValue } from 'recoil';
import { Input } from '@/components/common/Input';
import RegisterLabel from '@/components/post/RegisterLabel';
import { INPUT_TEXTS, LABEL_TEXTS } from '@/constants/common';
import { registPostState } from '@/atoms/atoms';
import { useInput } from '@/hooks/useInput';
import { css } from 'styled-system/css';

export default function PostInputTitle({
  inputRef
}: {
  inputRef: React.RefObject<HTMLInputElement>;
}) {
  const { post_title } = useRecoilValue(registPostState);
  const { value, onChange: handleChange } = useInput(post_title);

  return (
    <>
      <RegisterLabel
        label={LABEL_TEXTS.title}
        essential
      />
      <div className={MarginTop6}>
        <Input
          type={INPUT_TEXTS.type.title.typeName}
          inputRef={inputRef}
          inputValue={value}
          handleChange={handleChange}
        />
      </div>
    </>
  );
}

const MarginTop6 = css`
  margin-top: 6px;
`;
