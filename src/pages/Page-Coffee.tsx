import { useRef } from 'react';
import LogInCTA from '@/components/coffee/LogInCTA';
import MyCalendar from '@/components/coffee/MyCalendar';
import MyCoffeeSum from '@/components/coffee/MyCoffeeSum';
import ScrollInducer from '@/components/coffee/ScrollInducer';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';
import { styled } from 'styled-system/jsx';

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
