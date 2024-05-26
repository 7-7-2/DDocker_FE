import { lazy, useRef } from 'react';
import MyCalendar from '@/components/coffee/MyCalendar';
import MyCoffeeSum from '@/components/coffee/MyCoffeeSum';
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
      <MyCoffeeSum signedIn={signedIn} />
      <MyCalendar signedIn={signedIn} />
      <Target ref={targetRef} />
      {!signedIn && <LogInCTA />}
      {!signedIn && <ScrollInducer targetRef={targetRef} />}
    </>
  );
};

const Target = styled.div`
  padding: 1px;
`;

export default Coffee;
