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
import { Column, FlexCenter, FlexGrow, Grid } from '@/styles/layout';

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
    activeNextBtn,
    activePrevBtn,
    handleNextBtn,
    handlePrevBtn,
    selectMonth,
    activeMonth
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
        nextBtnState={activeNextBtn}
        prevBtnState={activePrevBtn}
        handleActionModal={handleActionModal}
        selectedTab={selectedTab}
        signedIn={signedIn}
      />

      {signedIn && isActionModal && (
        <ActionModal handleActionModal={handleActionModal}>
          <PickMonthContainer>
            <div className={cx(Medium, MarginS20, PaddingB12)}>
              {description}
            </div>
            <Navigation
              activeStartDate={activeStartDate}
              handleNextBtn={handleNextBtn}
              handlePrevBtn={handlePrevBtn}
              nextBtnState={activeNextBtn}
              prevBtnState={activePrevBtn}
              isActionModal={isActionModal}
            />
            <MonthBtns className={cx(Grid, Medium)}>
              {COFFEE_CALENDAR_TEXTS.month.map(item => (
                <MonthBtn
                  key={item}
                  className={cx(
                    FlexCenter,
                    !activeNextBtn &&
                      item > Number(value.split('-')[1]) &&
                      Disabled
                  )}
                  disabled={
                    !activeNextBtn && item > Number(value.split('-')[1])
                  }
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

      <TabContainer className={Column}>
        {selectedTab === tabs[0] ? (
          <div className={FlexGrow}>
            <HistoryTab
              signedIn={signedIn}
              activeStartDate={activeStartDate}
            />
            <Target ref={targetRef} />
          </div>
        ) : (
          <AnalysisTab signedIn={signedIn} />
        )}
      </TabContainer>
    </Container>
  );
};

const Target = styled.div`
  padding: 1px;
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

const TabContainer = styled.div`
  height: calc(100% - 100px);
  overflow-y: auto !important;
  padding: 0 20px;
`;

export default Coffee;
