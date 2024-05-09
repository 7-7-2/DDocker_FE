import { Align } from '@/styles/layout';
import { InputByteCheck, InputFontBase } from '@/styles/styles';
import React from 'react';
import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';

const TextArea = ({
  placeholder,
  inputValue,
  inputRef,
  handleChange,
  inputLength,
  type
}: {
  placeholder: string;
  inputValue: string | undefined;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  inputLength: number;
  type?: string;
}) => {
  return (
    <TextAreaBox className={type ? ReportBox : undefined}>
      <Textarea
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
  );
};

const TextAreaBox = styled.div`
  width: 100%;
  border-radius: 10px;
  padding: 14px 16px;
  border: 1px solid #ccc;
  &:focus-within {
    border: 1px solid var(--colors-main);
  }
`;

const ReportBox = css`
  border: 1px solid #f5f5f5;
  background-color: #f5f5f5;
`;

const Textarea = styled.textarea`
  height: 64px;
  font-size: var(--font-sizes-sm);
`;

const InputByteBox = styled.div`
  justify-content: flex-end;
`;

const LengthLimit = styled.div`
  display: flex;
  color: var(--colors-subtext);
  align-items: flex-end;
`;
export default TextArea;
