import React from 'react';
import LegendMarker from '@/components/coffee/LegendMarker';

import { COFFEE_ANALYSIS_TEXTS } from '@/constants/coffee';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Column, Flex } from '@/styles/layout';
import { Gap6, Medium } from '@/styles/styles';

const { donutChart } = COFFEE_ANALYSIS_TEXTS;
const DonutChart = () => {
  return (
    <Container className={cx(Flex, Align)}>
      <Chart></Chart>
      <Legend className={Column}>
        {donutChart.legend.map(item => (
          <div className={cx(Flex, Align, Gap6, Medium)}>
            <LegendMarker legend={item.key} />
            {item.text}
          </div>
        ))}
      </Legend>
    </Container>
  );
};
const Container = styled.div`
  gap: 30px;
  margin: 38px 0 16px 26px;
`;
const Chart = styled.div`
  height: 172px;
  width: 172px;
  border-radius: 50%;
  background-color: var(--colors-btn-grey);
`;

const Legend = styled.div`
  font-size: var(--font-sizes-sm);
  color: var(--colors-main-dark);
  gap: 10px;
`;
export default DonutChart;
