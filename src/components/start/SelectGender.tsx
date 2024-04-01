import { TouchEventHandler, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Label } from '@/components/common/Label';
import Button from '@/components/common/Button';
import { LABEL_TEXTS } from '@/constants/common';
import { INITIAL_FORM_TEXTS } from '@/constants/start';
import { authState } from '@/atoms/atoms';
import { styled } from 'styled-system/jsx';
import { css, cx } from 'styled-system/css';
import { Between, Flex } from '@/styles/layout';

const { gender } = INITIAL_FORM_TEXTS;

const SelectGender = () => {
  const [userInit, setUserInit] = useRecoilState(authState);
  const [inputValue, setInputValue] = useState('');
  const genderType = [
    { gender: gender.male, genderNum: 0 },
    { gender: gender.female, genderNum: 1 }
  ];

  const clickBtn: TouchEventHandler<HTMLButtonElement> = e => {
    const selectGender = e.currentTarget.value === gender.male ? 0 : 1;
    e.currentTarget.id;
    const selectedGender = {
      ...userInit,
      gender: selectGender
    };
    setUserInit(selectedGender);
    setInputValue(e.currentTarget.value);
  };

  return (
    <SelectGenderContiner>
      <Label
        label={LABEL_TEXTS.gender.label}
        inputValue={inputValue || JSON.stringify(userInit.gender)}
      />
      <div className={cx(Flex, Between, SelectGenderBtnGap)}>
        {genderType.map(item => (
          <Button
            key={item.genderNum}
            value={item.gender}
            text={item.gender}
            onTouchEnd={clickBtn}
            className={cx(
              userInit.gender === item.genderNum
                ? SelectedGender
                : NoneSelectedGender,
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
