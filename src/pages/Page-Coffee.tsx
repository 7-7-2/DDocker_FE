import { Suspense, lazy, useRef } from 'react';
import MyCalendar from '@/components/coffee/MyCalendar';
import MyCoffeeSum from '@/components/coffee/MyCoffeeSum';
import SEOMeta from '@/components/common/SEOMeta';
import SEO_DATA from '@/constants/SEOData';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';
import { styled } from 'styled-system/jsx';

const LogInCTA = lazy(() => import('../components/coffee/LogInCTA'));
const ScrollInducer = lazy(() => import('../components/coffee/ScrollInducer'));

const Coffee = () => {
  useComposeHeader(true, '', 'icons');
  const { signedIn } = useGetSignedIn();
  const targetRef = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <SEOMeta pageData={SEO_DATA.coffee} />
      <MyCoffeeSum signedIn={signedIn} />
      <MyCalendar signedIn={signedIn} />
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
    </>
  );
};

const Target = styled.div`
  padding: 1px;
`;

export default Coffee;
