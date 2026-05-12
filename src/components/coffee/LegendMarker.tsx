import { COFFEE_CALENDAR_TEXTS } from '@/constants/coffee';

import { styled } from 'styled-system/jsx';
import { Excessive, Healthy, Recommended } from '@/styles/styles';
const LegendMarker = ({ legend }: { legend: string }) => {
  return (
    <Marker
      className={
        legend === COFFEE_CALENDAR_TEXTS.legend[0].className
          ? Healthy
          : legend === COFFEE_CALENDAR_TEXTS.legend[1].className
            ? Recommended
            : Excessive
      }
    />
  );
};

const Marker = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
`;

export default LegendMarker;
