import { COFFEE_CALENDAR_TEXTS } from '@/constants/coffee';

import { ChartMarker, Excessive, Healthy, Recommended } from '@/styles/styles';
import { css, cx } from 'styled-system/css';
const LegendMarker = ({ legend, type }: { legend: string; type?: string }) => {
  return (
    <div
      className={cx(
        type ? ChartMarker : Marker,
        legend === COFFEE_CALENDAR_TEXTS.legend[0].className
          ? Healthy
          : legend === COFFEE_CALENDAR_TEXTS.legend[1].className
            ? Recommended
            : Excessive
      )}
    />
  );
};

const Marker = css`
  width: 6px;
  height: 6px;
  border-radius: 50%;
`;

export default LegendMarker;
