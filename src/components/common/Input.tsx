import { ChangeEvent, useState } from 'react';
import Icon from '@/components/common/Icon';
import { AlretMessage } from '@/components/common/AlretMessage';
import { INPUT_TEXTS } from '@/constants/common';
import { ICON_UPLOAD } from '@/constants/icons';
import { InputProps } from '@/types/types';

export const Input = ({
  type,
  handleEvent,
  setInputValue,
  inputValue,
  btn
}: InputProps) => {
  const [isAlret, setIsAlret] = useState(false);
  const { nickname, comment, title, search } = INPUT_TEXTS.type;
  let submitBtn;
  let inputLength;
  let inputPlaceholder;

  const handleInputBox = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    {
      !inputValue && setIsAlret(false);
    }
  };

  switch (type) {
    case nickname.typeName:
      submitBtn = nickname.btnText;
      inputLength = `${inputValue?.length}/8`;
      inputPlaceholder = nickname.placeholder;
      break;
    case comment.typeName:
      submitBtn = <Icon {...ICON_UPLOAD} />;
      inputPlaceholder = comment.placeholder;
      break;
    case title.typeName:
      inputLength = `${inputValue?.length}/16`;
      inputPlaceholder = title.placeholder;
      break;
    case search.typeName:
      inputPlaceholder = search.placeholder;
      break;
  }

  return (
    <div>
      <div>
        <AlretMessage
          type={type}
          isAlret={isAlret}
          inputValue={inputValue}
        />
        <input
          type="text"
          placeholder={inputPlaceholder}
          value={inputValue}
          onChange={handleInputBox}
        />
        <div>{inputLength}</div>
        {btn && (
          <button
            type="button"
            onClick={handleEvent}
            onTouchEnd={handleEvent}>
            {submitBtn}
          </button>
        )}
      </div>
    </div>
  );
};
