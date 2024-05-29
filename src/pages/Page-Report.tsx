import { useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useLocation, useParams } from 'react-router-dom';

import Button from '@/components/common/Button';
import ReportReason from '@/components/report/ReportReason';
import OtherReasonInput from '@/components/report/OtherReasonInput';

import SEOMeta from '@/components/common/SEOMeta';
import SEO_DATA from '@/constants/SEOData';

import { POST_REPORT_TEXTS } from '@/constants/report';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { footerShowState } from '@/atoms/atoms';
import { postReport, reportComment } from '@/api/support';

import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import { Column } from '@/styles/layout';
import { DisabledBtn, RegistBtn } from '@/styles/styles';

const { type, btn } = POST_REPORT_TEXTS;

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

  const pageData = {
    ...SEO_DATA.report,
    pageUrl: `${SEO_DATA.report.pageUrl}/${postId}`
  };

  return (
    <>
      <SEOMeta pageData={pageData} />
      <Container className={Column}>
        <ReportReason handleOnTouchEnd={handleSelectOption} />
        <OtherReasonInput
          inputValue={inputValue}
          inputRef={inputRef}
          handleChange={handleChange}
        />
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

export default Report;
