import Icon from '@/components/common/Icon';
import { INPUT_TEXTS } from '@/constants/common';
import { InputProps } from '@/types/types';
import { iconPropsGenerator } from '@/utils/iconPropsGenerator';

import { styled } from 'styled-system/jsx';
import { Align, Between } from '@/styles/layout';
import { css, cx } from 'styled-system/css';
import { InputFontSm, InputFontBase } from '@/styles/styles';
import { useInput } from '@/hooks/useInput';

export const Input = ({ type, handleEvent }: InputProps) => {
  const { nickname, comment, title, search } = INPUT_TEXTS.type;
  const { value: inputValue, onChange: handleInputBox } = useInput('');
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
        type === title.typeName
          ? cx(Align, Between, TitleInput)
          : cx(Align, Between)
      }>
      <input
        className={InputFontBase}
        type="text"
        placeholder={inputPlaceholder}
        value={inputValue}
        onChange={handleInputBox}
        maxLength={inputLength}
      />
      <InputBox className={Align}>
        {inputLength && (
          <InpoutLength className={Align}>
            {inputValue?.length}
            <LengthLimit>/{inputLength}</LengthLimit>
          </InpoutLength>
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

const TitleInput = css`
  background-color: #f5f5f5;
`;

const InpoutLength = styled.div`
  color: #313131;
  font-family: Pretendard;
  font-size: var(--font-sizes-xs);
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
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
