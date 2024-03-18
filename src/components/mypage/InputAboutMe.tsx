import { useState } from 'react';
import { Label } from '@/components/common/Label';
import { INPUT_TEXTS, LABEL_TEXTS } from '@/constants/common';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align } from '@/styles/layout';
import { InputByteCheck, InputFontBase } from '@/styles/styles';

const { aboutMe } = LABEL_TEXTS;
const { placeholder, inputLength } = INPUT_TEXTS.type.aboutMe;

const InputAboutMe = ({
  inputRef,
  userAboutMe
}: {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  userAboutMe: string | undefined;
}) => {
  const [inputValue, setInputValue] = useState(userAboutMe);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Container>
      <Label
        inputValue={inputValue}
        label={aboutMe.label}
        userAboutMe={userAboutMe}
      />
      <TextAreaBox>
        <Textarea
          name={aboutMe.label}
          className={InputFontBase}
          placeholder={placeholder}
          cols={28}
          rows={3}
          value={inputValue}
          ref={inputRef}
          onChange={handleChange}
          maxLength={inputLength}
        />
        <InputByteBox className={cx(Align, InputByteCheck)}>
          {inputValue?.length}
          <LengthLimit>/{inputLength}</LengthLimit>
        </InputByteBox>
      </TextAreaBox>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 24px;
`;

const TextAreaBox = styled.div`
  width: 100%;
  border-radius: 10px;
  padding: 14px 16px;
  border: 1px solid #ccc;
  &:focus-within {
    border: 1px solid var(--colors-main);
  }
`;

const Textarea = styled.textarea`
  height: 64px;
`;

const InputByteBox = styled.div`
  justify-content: flex-end;
`;

const LengthLimit = styled.div`
  display: flex;
  color: #a6a6a6;
  align-items: flex-end;
`;

export default InputAboutMe;
