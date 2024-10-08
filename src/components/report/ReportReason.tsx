import React from 'react';
import { POST_REPORT_TEXTS } from '@/constants/report';

import { styled } from 'styled-system/jsx';
import { css, cx } from 'styled-system/css';
import { Align, Flex } from '@/styles/layout';
import { Semibold } from '@/styles/styles';
import RadioBtn from '@/components/common/RadioBtn';

const { reason, title } = POST_REPORT_TEXTS;

const ReportReason = ({
  handleOnClick: handleSelectOption
}: {
  handleOnClick: React.ChangeEventHandler<HTMLElement>;
}) => {
  return (
    <SelecteRadioBtn>
      <Title className={Semibold}>{title.radioBtn}</Title>
      <form>
        {reason.map(item => (
          <RadioContainer
            key={item}
            className={cx(Flex, Align)}>
            <RadioBtn
              className={RadioBtnContainer}
              id={item}
              fn={handleSelectOption}
            />
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

const RadioBtnContainer = css`
  border: 1px solid var(--colors-main-dark);
`;

export default ReportReason;
