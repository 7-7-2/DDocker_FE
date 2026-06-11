import { useMainAnalysisChart } from '@/hooks/coffee/useMainAnalysisChart';
import { MainAnalysisChartDataType } from '@/types/types';
import { COFFEE_ANALYSIS_TEXTS } from '@/constants/coffee';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Medium } from '@/styles/styles';
import { Align, Column, Flex } from '@/styles/layout';

const { unit, tabs, currentKey } = COFFEE_ANALYSIS_TEXTS.mainChart;
const MainAnalysisChart = ({
  period,
  analysisData,
  selectedTab
}: {
  period: string;
  analysisData: MainAnalysisChartDataType[];
  selectedTab: string;
}) => {
  const { newUser, labelFormatter, referenceUnit, caffeineReferenceUnit } =
    useMainAnalysisChart(period, analysisData);

  return (
    <Container>
      <BarChart className={cx(Flex, Medium)}>
        {analysisData?.map((data, idx) => (
          <BarItem
            className={cx(Align, Column)}
            key={data.label}>
            {!newUser && data.cups !== 0 && (
              <>
                <ChartValue>
                  {selectedTab === tabs[0]
                    ? data.cups !== 0 && data.cups
                    : data.caffeineMg !== 0 && data.caffeineMg}
                  {selectedTab === tabs[0] && data.cups !== 0 && unit.cup}
                </ChartValue>
                <Bar
                  className={cx(idx === analysisData.length - 1 && CurrentBar)}
                  style={{
                    height: `${selectedTab === tabs[0] ? data.cups * referenceUnit : data.caffeineMg * caffeineReferenceUnit}px`
                  }}
                />
              </>
            )}
            {newUser && <span>-</span>}
            {idx === analysisData.length - 1 ? (
              <CurrentKey>
                {period === COFFEE_ANALYSIS_TEXTS.tabs[0]
                  ? currentKey[0]
                  : currentKey[1]}
              </CurrentKey>
            ) : (
              <ChartKey className={Medium}>
                {period === COFFEE_ANALYSIS_TEXTS.tabs[0] && '~'}
                <span style={{ letterSpacing: '-0.3px' }}>
                  {labelFormatter(String(data.label))}
                </span>
              </ChartKey>
            )}
          </BarItem>
        ))}
      </BarChart>
    </Container>
  );
};

const Container = styled.div`
  margin: 24px auto 0;
  height: 200px;
`;
const BarChart = styled.div`
  font-size: var(--font-sizes-sm);
  color: var(--colors-mid-grey);
  & > :last-child {
    color: var(--colors-main);
    font-weight: 700;
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
  letter-spacing: 0.5px;
`;
const ChartKey = styled.div`
  margin-top: 10px;
  line-height: 20px;
  letter-spacing: -2px;
  font-size: 12px;
  white-space: nowrap;
`;
const CurrentKey = styled.span`
  font-size: 12px;
  margin-top: 10px;
  line-height: 20px;
`;
const Bar = styled.div`
  width: 38px;
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
