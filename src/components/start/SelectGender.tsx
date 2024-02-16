import { TouchEventHandler, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Label } from '@/components/common/Label';
import Button from '@/components/common/Button';
import { LABEL_TEXTS } from '@/constants/common';
import { INITIAL_FORM_TEXTS } from '@/constants/start';
import { authState } from '@/atoms/atoms';
import useSetUserInitialInfo from '@/hooks/useSetUserInitialInfo';
import { styled } from 'styled-system/jsx';
import { css, cx } from 'styled-system/css';
import { Between, Flex } from '@/styles/layout';

const SelectGender = () => {
  const [userInit, setUserInit] = useRecoilState(authState);
  const [inputValue, setInputValue] = useState('');
  const [isAlert, setIsAlert] = useState(false);
  const { gender } = INITIAL_FORM_TEXTS;
  const genderType = [gender.male, gender.female];

  const clickBtn: TouchEventHandler<HTMLButtonElement> = e => {
    const selectedGender = {
      ...userInit,
      gender: e.currentTarget.value
    };
    setUserInit(selectedGender);
    setInputValue(e.currentTarget.value);
    setIsAlert(true);
  };

  return (
    <SelectGenderContiner>
      <Label
        label={LABEL_TEXTS.gender.label}
        isAlert={isAlert}
        inputValue={inputValue || userInit.gender}
      />
      <div className={cx(Flex, Between, SelectGenderBtnGap)}>
        {genderType.map((item, idx) => (
          <Button
            key={idx}
            value={item}
            text={item}
            onTouchEnd={clickBtn}
            className={cx(
              userInit.gender === item ? SelectedGender : NoneSelectedGender,
              SelectGenderBtn
            )}
          />
        ))}
      </div>
    </SelectGenderContiner>
  );
};

const NoneSelectedGender = css`
  border: 1px solid #ccc;
  color: #a6a6a6;
`;

const SelectedGender = css`
  border: 1px solid var(--colors-main);
  color: var(--colors-main);
`;

const SelectGenderBtn = css`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background-color: #fff;
  line-height: 24px;
`;

const SelectGenderBtnGap = css`
  gap: 0 8px;
`;

const SelectGenderContiner = styled.div`
  margin-top: 24px;
  height: auto;
`;

export default SelectGender;
