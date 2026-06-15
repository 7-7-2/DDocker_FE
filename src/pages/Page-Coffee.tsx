import { Suspense, lazy, useRef, useState } from 'react';

import SEOMeta from '@/components/common/SEOMeta';
import Tabs from '@/components/common/Tabs';
import Navigation from '@/components/coffee/Navigation';
import HistoryTab from '@/components/coffee/HistoryTab';
import ActionModal from '@/components/common/ActionModal';
import AnalysisTab from '@/components/coffee/AnalysisTab';

import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';
import { useShowFooter } from '@/hooks/useShowFooter';
import { useCalendarNav } from '@/hooks/coffee/useCalendarNav';
import { useActionModal } from '@/hooks/post/useActionModal';
import { monthFormmater } from '@/utils/convertDateFormmater';

import SEO_DATA from '@/constants/SEOData';
import { COFFEE_TEXTS, COFFEE_CALENDAR_TEXTS } from '@/constants/coffee';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { MarginS20, Medium, PaddingB12 } from '@/styles/styles';
import { FlexCenter, Grid } from '@/styles/layout';

const LogInCTA = lazy(() => import('../components/coffee/LogInCTA'));
const ScrollInducer = lazy(() => import('../components/coffee/ScrollInducer'));

const { header, tabs, month, description } = COFFEE_TEXTS;
const Coffee = () => {
  useShowFooter(true);
  useComposeHeader('', header, 'icons');
  const { isActionModal, handleActionModal } = useActionModal();
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { signedIn } = useGetSignedIn();
  const {
    value,
    activeStartDate,
    nextBtnState,
    prevBtnState,
    handleNextBtn,
    handlePrevBtn,
    selectMonth,
    activeMonth,
    weeklyAnalysis
  } = useCalendarNav(isActionModal, selectedTab, handleActionModal);

  const handleSelectTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedTab(e.currentTarget.value);
  };

  return (
    <Container>
      <SEOMeta pageData={SEO_DATA.coffee} />
      <div className={MarginS20}>
        <Tabs
          tabs={tabs}
          selectedTab={selectedTab}
          handleButtonClick={handleSelectTab}
        />
      </div>
      <Navigation
        activeStartDate={activeStartDate}
        handleNextBtn={handleNextBtn}
        handlePrevBtn={handlePrevBtn}
        nextBtnState={nextBtnState}
        prevBtnState={prevBtnState}
        handleActionModal={handleActionModal}
        selectedTab={selectedTab}
      />
      {isActionModal && (
        <ActionModal handleActionModal={handleActionModal}>
          <PickMonthContainer>
            <div className={cx(Medium, MarginS20, PaddingB12)}>
              {description}
            </div>
            <Navigation
              activeStartDate={activeStartDate}
              handleNextBtn={handleNextBtn}
              handlePrevBtn={handlePrevBtn}
              nextBtnState={nextBtnState}
              prevBtnState={prevBtnState}
              isActionModal={isActionModal}
            />
            <MonthBtns className={cx(Grid, Medium)}>
              {COFFEE_CALENDAR_TEXTS.month.map(item => (
                <MonthBtn
                  key={item}
                  className={cx(
                    FlexCenter,
                    prevBtnState &&
                      item > Number(value.split('-')[1]) &&
                      Disabled
                  )}
                  disabled={prevBtnState && item > Number(value.split('-')[1])}
                  onClick={selectMonth}
                  value={item}>
                  {item}
                  {month}
                  {monthFormmater(item) === activeMonth.split('-')[1] && (
                    <div className={selectedTile} />
                  )}
                </MonthBtn>
              ))}
            </MonthBtns>
          </PickMonthContainer>
        </ActionModal>
      )}
      <ScrollContainer>
        {selectedTab === tabs[0] ? (
          <TabContainer>
            <HistoryTab
              signedIn={signedIn}
              activeStartDate={activeStartDate}
            />
            <Target ref={targetRef} />
            {/* {!signedIn && (
              <Suspense>
                <LogInCTA />
              </Suspense>
            )}
            {!signedIn && (
              <Suspense>
                <ScrollInducer targetRef={targetRef} />
              </Suspense>
            )} */}
          </TabContainer>
        ) : (
          <TabContainer>
            <AnalysisTab signedIn={signedIn} />
          </TabContainer>
        )}
      </ScrollContainer>
    </Container>
  );
};

const Target = styled.div`
  padding: 1px;
`;
const TabContainer = styled.div`
  margin: 0 20px;
`;
const Container = styled.div`
  height: calc(100dvh - 120px);
  margin: 0 -20px;
  overflow-y: hidden;
  touch-action: none;
`;
const PickMonthContainer = styled.div`
  margin: -10px 0 0 -20px;
  font-size: var(--font-sizes-base);
`;
const MonthBtns = styled.div`
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 2px 20px 0;
`;
const MonthBtn = styled.button`
  height: 70px;
  font-size: var(--font-sizes-base);
`;
const selectedTile = css`
  height: 56px;
  width: 56px;
  border-radius: 50%;
  background-color: var(--colors-border-grey);
  position: absolute;
  z-index: -1;
`;
const Disabled = css`
  color: var(--colors-subtext);
`;
const ScrollContainer = styled.div`
  height: calc(100% - 88px);
  overflow-y: scroll !important;
`;

export default Coffee;
