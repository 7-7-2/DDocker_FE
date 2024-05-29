import React from 'react';
import TextArea from '@/components/common/TextArea';
import { POST_REPORT_TEXTS } from '@/constants/report';

import { styled } from 'styled-system/jsx';
import { css, cx } from 'styled-system/css';
import { Align } from '@/styles/layout';
import { Semibold } from '@/styles/styles';

const { type, title, placeHolder, description } = POST_REPORT_TEXTS;

const OtherReasonInput = ({
  inputValue,
  inputRef,
  handleChange
}: {
  inputValue: string;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <>
      <Title className={cx(Semibold, marginBottom)}>{title.textArea}</Title>
      <TextArea
        placeholder={placeHolder}
        inputValue={inputValue}
        inputRef={inputRef}
        handleChange={handleChange}
        inputLength={1000}
        type={type}
      />
      <Description className={Align}>{description}</Description>
    </>
  );
};
const Title = styled.div`
  margin-left: 1px;
  color: var(--colors-main-dark);
  font-size: var(--font-sizes-base);
  line-height: 24px;
`;

const Description = styled.div`
  color: var(--colors-mid-grey);
  margin-top: 12px;
  font-size: var(--font-sizes-sm);
  &::before {
    content: ' ';
    background-color: var(--colors-mid-grey);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    margin-right: 6px;
    display: inline-block;
  }
`;

const marginBottom = css`
  margin-bottom: 10px;
`;

export default OtherReasonInput;
