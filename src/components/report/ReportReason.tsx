import React from 'react';
import { POST_REPORT_TEXTS } from '@/constants/report';

import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import { Align, Flex } from '@/styles/layout';
import { Semibold } from '@/styles/styles';

const { reason, title } = POST_REPORT_TEXTS;

const ReportReason = ({
  handleOnTouchEnd: handleSelectOption
}: {
  handleOnTouchEnd: React.TouchEventHandler<HTMLElement>;
}) => {
  return (
    <SelecteRadioBtn>
      <Title className={Semibold}>{title.radioBtn}</Title>
      <form>
        {reason.map(item => (
          <RadioContainer
            key={item}
            className={cx(Flex, Align)}>
            <RadioBtn>
              <Radio
                type="radio"
                name="options"
                id={item}
                onTouchEnd={handleSelectOption}
              />
            </RadioBtn>
            <label
              htmlFor={item}
              id={item}
              onTouchEnd={handleSelectOption}>
              {item}
            </label>
          </RadioContainer>
        ))}
      </form>
    </SelecteRadioBtn>
  );
};

const Title = styled.div`
  margin-left: 1px;
  color: var(--colors-main-dark);
  font-size: var(--font-sizes-base);
  line-height: 24px;
`;

const SelecteRadioBtn = styled.div`
  height: auto;
  margin: 18px 0;
`;

const RadioContainer = styled.div`
  gap: 8px;
  margin-top: 14px;
  font-size: var(--font-sizes-sm);
  line-height: 22px;
`;

const RadioBtn = styled.div`
  border: 1px solid var(--colors-main-dark);
  border-radius: 50%;
  width: 16px;
  height: 16px;
  position: relative;
`;

const Radio = styled.input`
  position: absolute;
  width: 14px;
  height: 14px;
  &[type='radio'] {
    appearance: none;
    border-radius: 50%;
  }
  &[type='radio']:checked {
    background-color: var(--colors-main-dark);
    border: 2px solid #fff;
  }
`;
export default ReportReason;
