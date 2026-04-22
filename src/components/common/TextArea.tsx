import React from 'react';
import { Align } from '@/styles/layout';
import { InputByteCheck, InputFontBase } from '@/styles/styles';
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
  inputValue: string | null;
  inputRef?: React.RefObject<HTMLTextAreaElement>;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  inputLength: number;
  type?: string;
}) => {
  const report = type === 'report';
  const post = type === 'post';
  const handleHeight = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    target.style.height = `${target.scrollHeight}px`;
  };

  return (
    <TextAreaBox className={report || post ? ReportBox : DefaultBox}>
      {!post ? (
        <Textarea
          className={InputFontBase}
          placeholder={placeholder}
          cols={28}
          rows={3}
          value={inputValue || ''}
          ref={inputRef}
          onChange={handleChange}
          maxLength={inputLength}
        />
      ) : (
        <Textarea
          className={InputFontBase}
          placeholder={placeholder}
          cols={28}
          value={inputValue || ''}
          ref={inputRef}
          onChange={handleChange}
          maxLength={inputLength}
          onInput={handleHeight}
          style={{ minHeight: '68px' }}
        />
      )}
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
  &:focus-within {
    border: 1px solid var(--colors-main);
  }
`;

const ReportBox = css`
  border: 1px solid var(--colors-tertiary);
  background-color: var(--colors-tertiary);
`;

const DefaultBox = css`
  border: 1px solid var(--colors-btn-grey);
  background-color: #fff;
`;

const Textarea = styled.textarea`
  min-height: 68px;
  resize: none;
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
