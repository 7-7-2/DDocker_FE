import { useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useLocation, useParams } from 'react-router-dom';

import Button from '@/components/common/Button';
import TextArea from '@/components/common/TextArea';
import { POST_REPORT_TEXTS } from '@/constants/report';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { footerShowState } from '@/atoms/atoms';
import { postReport, reportComment } from '@/api/support';

import { styled } from 'styled-system/jsx';
import { css, cx } from 'styled-system/css';
import { Align, Column, Flex } from '@/styles/layout';
import { DisabledBtn, RegistBtn, Semibold } from '@/styles/styles';

const { reason, type, title, placeHolder, description, btn } =
  POST_REPORT_TEXTS;

const Report = () => {
  useComposeHeader(false, '신고하기', 'close');
  const { postId } = useParams();
  const { state } = useLocation();

  const goToBack = useNavigateTo('-1');
  const displayFooter = useSetRecoilState(footerShowState);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [selectOption, setselectOption] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelectOption = (e: React.TouchEvent<HTMLElement>) => {
    setselectOption(e.currentTarget.id);
  };

  const handleSubmitPost = async () => {
    const reportData = {
      reason: selectOption,
      other: inputRef.current?.value || null
    };
    const res =
      postId && selectOption && (await postReport(postId, reportData));
    res && displayFooter(true);
    res && goToBack();
  };

  const handleSubmitComment = async () => {
    const reportData = {
      reason: selectOption,
      postId: postId,
      other: inputRef.current?.value || null,
      type: state.comment ? 'comment' : 'reply'
    };
    const res =
      state &&
      postId &&
      selectOption &&
      (await reportComment(state.id, reportData));
    res && displayFooter(true);
    res && goToBack();
  };

  return (
    <>
      <Container className={Column}>
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
        <div>
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
        </div>
      </Container>
      <Button
        value={type}
        text={btn}
        onTouchEnd={state ? handleSubmitComment : handleSubmitPost}
        className={cx(RegistBtn, !selectOption && DisabledBtn)}
      />
    </>
  );
};

const Container = styled.div`
  gap: 18px;
  height: calc(100% - 50px);
`;

const SelecteRadioBtn = styled.div`
  height: auto;
  margin: 18px 0;
`;

const Title = styled.div`
  margin-left: 1px;
  color: var(--colors-main-dark);
  font-size: var(--font-sizes-base);
  line-height: 24px;
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

export default Report;
