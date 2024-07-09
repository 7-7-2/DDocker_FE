import { useState } from 'react';
import TextArea from '@/components/common/TextArea';
import RegisterLabel from '@/components/post/RegisterLabel';
import { LABEL_TEXTS, INPUT_TEXTS } from '@/constants/common';
import { registPostState } from '@/atoms/atoms';
import { MarginT6 } from '@/styles/styles';
import { useRecoilValue } from 'recoil';

const { description } = INPUT_TEXTS.type;

const PostInputDescription = ({
  inputRef
}: {
  inputRef: React.RefObject<HTMLTextAreaElement>;
}) => {
  const { description: initialDescription, brand } =
    useRecoilValue(registPostState);
  const [inputValue, setInputValue] = useState(initialDescription || '');
  const myCafe = brand === 'private';

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <RegisterLabel label={LABEL_TEXTS.description} />
      <div className={MarginT6}>
        <TextArea
          placeholder={!myCafe ? description.placeholder : description.myCafe}
          inputValue={inputValue}
          inputRef={inputRef}
          handleChange={handleChange}
          inputLength={description.inputLength}
          type={description.typeName}
        />
      </div>
    </>
  );
};

export default PostInputDescription;
