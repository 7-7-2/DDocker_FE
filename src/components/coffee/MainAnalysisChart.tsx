import { MonthlyAnalysisWeeksDataType } from '@/types/types';
import { COFFEE_ANALYSIS_TEXTS } from '@/constants/coffee';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Medium } from '@/styles/styles';
import { Align, Column, Flex } from '@/styles/layout';

const { unit, tabs } = COFFEE_ANALYSIS_TEXTS.mainChart;
const MainAnalysisChart = ({
  analysisData,
  selectedTab
}: {
  analysisData: MonthlyAnalysisWeeksDataType[];
  selectedTab: string;
}) => {
  return (
    <Container>
      <BarChart className={cx(Flex, Medium)}>
        {analysisData?.map((data, idx) => (
          <BarItem
            className={cx(Align, Column)}
            key={data.weekNum}>
            <ChartValue>
              {selectedTab === tabs[0] ? data.cups : data.caffeineMg}
              {selectedTab === tabs[0] ? unit.cup : unit.mg}
            </ChartValue>
            <Bar
              className={cx(idx === analysisData.length - 1 && CurrentBar)}
              style={{
                height: `${selectedTab === tabs[0] ? data.cups * 14 : data.caffeineMg / 10}px`
              }}
            />
            <ChartKey>
              {data?.weekNum}
              {unit.week}
            </ChartKey>
          </BarItem>
        ))}
      </BarChart>
    </Container>
  );
};

const Container = styled.div`
  margin: 20px auto;
  height: 200px;
`;
const BarChart = styled.div`
  font-size: var(--font-sizes-sm);
  color: var(--colors-mid-grey);
  & > :last-child {
    color: var(--colors-main);
  }
`;
const BarItem = styled.div`
  width: 48px;
  height: 200px;
  padding: 0 5px 10px;
  position: relative;
  justify-content: flex-end;
`;
const ChartValue = styled.span`
  line-height: 22px;
`;
const ChartKey = styled.span`
  line-height: 22px;
`;
const Bar = styled.div`
  width: 42px;
  min-height: 10px;
  max-height: 140px;
  border-radius: 10px;
  margin-top: 6px;
  background-color: var(--colors-border-grey);
`;
const CurrentBar = css`
  background-color: var(--colors-main);
`;

export default MainAnalysisChart;
