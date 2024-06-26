import { useState } from 'react';
import { Label } from '@/components/common/Label';
import TextArea from '@/components/common/TextArea';
import { INPUT_TEXTS, LABEL_TEXTS } from '@/constants/common';

import { styled } from 'styled-system/jsx';

const { aboutMe } = LABEL_TEXTS;
const { placeholder, inputLength } = INPUT_TEXTS.type.aboutMe;

const InputAboutMe = ({
  inputRef,
  Icon = true,
  userAboutMe
}: {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  Icon?: boolean;
  userAboutMe?: string | null;
}) => {
  const [inputValue, setInputValue] = useState(userAboutMe || undefined);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Container>
      <Label
        inputValue={inputValue}
        label={aboutMe.label}
        Icon={Icon}
        userAboutMe={userAboutMe}
      />
      <TextArea
        placeholder={placeholder}
        inputValue={inputValue}
        inputRef={inputRef}
        handleChange={handleChange}
        inputLength={inputLength}></TextArea>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 24px;
  /* margin-bottom: 100px; */
`;

export default InputAboutMe;
