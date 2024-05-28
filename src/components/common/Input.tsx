import Icon from '@/components/common/Icon';
import { INPUT_TEXTS } from '@/constants/common';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';
import { InputProps } from '@/types/types';
import { styled } from 'styled-system/jsx';
import { Align, Between } from '@/styles/layout';
import { css, cx } from 'styled-system/css';
import {
  InputFontSm,
  InputFontBase,
  InputByteCheck,
  BgF5
} from '@/styles/styles';

export const Input = ({
  type,
  handleEvent,
  inputRef,
  inputValue,
  handleChange,
  handleKeyDown
}: InputProps) => {
  const { nickname, comment, title, search } = INPUT_TEXTS.type;
  let submitBtn;
  let inputLength;
  let inputPlaceholder;

  switch (type) {
    case nickname.typeName:
      submitBtn = (
        <button
          className={cx(nicknameBtn, InputFontSm)}
          type="button"
          onClick={handleEvent}
          onTouchEnd={handleEvent}>
          {nickname.btnText}
        </button>
      );
      inputLength = 8;
      inputPlaceholder = nickname.placeholder;
      break;
    case comment.typeName:
      submitBtn = (
        <button
          type="button"
          // onClick={handleEvent}
          onTouchEnd={handleEvent}>
          <Icon {...iconPropsGenerator('upload')} />
        </button>
      );
      inputPlaceholder = comment.placeholder;
      break;
    case title.typeName:
      inputLength = 16;
      inputPlaceholder = title.placeholder;
      break;
    case search.typeName:
      inputPlaceholder = search.placeholder;
      break;
  }

  return (
    <InputContainer
      tabIndex={0}
      className={
        type === title.typeName ? cx(Align, Between, BgF5) : cx(Align, Between)
      }>
      <input
        className={InputFontBase}
        type="text"
        placeholder={inputPlaceholder}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        maxLength={inputLength}
      />
      <InputBox className={Align}>
        {inputLength && (
          <div className={cx(Align, InputByteCheck)}>
            {inputValue?.length}
            <LengthLimit>/{inputLength}</LengthLimit>
          </div>
        )}
        {submitBtn}
      </InputBox>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  width: 100%;
  border-radius: 10px;
  padding: 14px 16px;
  height: 50px;
  border: 1px solid #ccc;
  &:focus-within {
    border: 1px solid var(--colors-main);
  }
`;

const InputBox = styled.div`
  height: 50px;
  gap: 8px;
`;

const LengthLimit = styled.div`
  color: #a6a6a6;
`;

const nicknameBtn = css`
  width: 75px;
  height: 34px;
  border-radius: 5px;
  padding: 0 13px;
  margin-right: -8px;
  color: #fff;
  background-color: var(--colors-main);
`;
