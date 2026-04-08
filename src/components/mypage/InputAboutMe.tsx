import { useState } from 'react';
import { Label } from '@/components/common/Label';
import TextArea from '@/components/common/TextArea';
import { INPUT_TEXTS, LABEL_TEXTS } from '@/constants/common';

import { Column } from '@/styles/layout';

const { aboutMe } = LABEL_TEXTS;
const { placeholder, inputLength } = INPUT_TEXTS.type.aboutMe;

const InputAboutMe = ({
  inputRef,
  icon,
  userAboutMe
}: {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  icon?: boolean;
  userAboutMe?: string | null;
}) => {
  const [inputValue, setInputValue] = useState(userAboutMe || null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <div className={Column}>
      <Label
        label={aboutMe.label}
        icon={icon}
        inputValue={inputValue}
        initValue={userAboutMe}
      />
      <TextArea
        placeholder={placeholder}
        inputValue={inputValue}
        inputRef={inputRef}
        handleChange={handleChange}
        inputLength={inputLength}
      />
    </div>
  );
};

export default InputAboutMe;
