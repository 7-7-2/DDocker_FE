import { Suspense, lazy, useRef, useState } from 'react';

import MyCalendar from '@/components/coffee/MyCalendar';
import MyCoffeeSum from '@/components/coffee/MyCoffeeSum';
import SEOMeta from '@/components/common/SEOMeta';

import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';
import SEO_DATA from '@/constants/SEOData';

import { styled } from 'styled-system/jsx';
import { COFFEE_TEXTS } from '@/constants/coffee';
import { useShowFooter } from '@/hooks/useShowFooter';
import Tabs from '@/components/common/Tabs';
import HistoryTab from '@/components/coffee/HistoryTab';
import { useCalendarNav } from '@/hooks/coffee/useCalendarNav';
import MonthNavigaition from '@/components/coffee/MonthNavigaition';
import { MarginS20 } from '@/styles/styles';

const LogInCTA = lazy(() => import('../components/coffee/LogInCTA'));
const ScrollInducer = lazy(() => import('../components/coffee/ScrollInducer'));

const { header, tabs } = COFFEE_TEXTS;
const Coffee = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { activeStartDate, nextBtnState, handleNextBtn, handlePrevBtn } =
    useCalendarNav();
  useShowFooter(true);
  useComposeHeader('', header, 'icons');
  const { signedIn } = useGetSignedIn();
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
      <MonthNavigaition
        activeStartDate={activeStartDate}
        nextBtnState={nextBtnState}
        handleNextBtn={handleNextBtn}
        handlePrevBtn={handlePrevBtn}
      />
      {/* <MyCoffeeSum signedIn={signedIn} /> */}
      <ScrollContainer>
        {selectedTab === tabs[0] && (
          <TabContainer>
            <HistoryTab
              signedIn={signedIn}
              activeStartDate={activeStartDate}
            />
            <Target ref={targetRef} />
            {!signedIn && (
              <Suspense>
                <LogInCTA />
              </Suspense>
            )}
            {!signedIn && (
              <Suspense>
                <ScrollInducer targetRef={targetRef} />
              </Suspense>
            )}
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

const ScrollContainer = styled.div`
  height: calc(100% - 88px);
  overflow-y: scroll !important;
`;

export default Coffee;
