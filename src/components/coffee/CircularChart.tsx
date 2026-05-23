import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { COFFEE_ANALYSIS_TEXTS } from '@/constants/coffee';

import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Column, Flex } from '@/styles/layout';
import { Bold, Gap20, Medium } from '@/styles/styles';

const { circularChart } = COFFEE_ANALYSIS_TEXTS;
const CircularChart = ({
  circularChartData
}: {
  circularChartData: { key: string; value: number }[];
}) => {
  const CircularCharts = ['recommended', 'excessive'];
  const textColor = (key: string) => {
    return key === CircularCharts[0] ? RecommendedColor : ExcessiveColor;
  };

  return (
    <Container className={cx(Flex, Align)}>
      {circularChartData.map(data => (
        <div
          key={data.key}
          className={cx(Column, Align, Gap20)}>
          <CircularProgressbarWithChildren
            value={data.value || 0}
            strokeWidth={10.76}
            className={cx(
              ChartStyle,
              data.key === CircularCharts[0] ? RecommendedStyle : ExcessiveStyle
            )}>
            <Percent
              className={cx(
                Bold,
                data.value ? textColor(data.key) : undefined
              )}>
              {data.value ? Math.round(data.value) : 0}
              {circularChart.percent}
            </Percent>
          </CircularProgressbarWithChildren>
          <Legend className={Medium}>
            {
              circularChart.legend[
                data.key as keyof typeof circularChart.legend
              ]
            }
          </Legend>
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div`
  gap: 43px;
  margin: 40px 30px 10px 30px;
`;

const Percent = styled.span`
  font-size: var(--font-sizes-xl);
  color: var(--colors-btn-grey);
`;

const Legend = styled.span`
  color: var(--colors-mid-grey);
  font-size: var(--font-sizes-sm);
  line-height: 22px;
`;

const ChartStyle = css`
  width: 116px;
  height: 116px;
  border-radius: 50%;
  & .CircularProgressbar-path {
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s ease 0s;
    transform-origin: center center;
  }
  & .CircularProgressbar-trail {
    stroke: var(--colors-border-grey);
  }
`;

const RecommendedStyle = css`
  & .CircularProgressbar-path {
    stroke: var(--colors-recommended);
  }
`;

const ExcessiveStyle = css`
  & .CircularProgressbar-path {
    stroke: var(--colors-delete-red);
  }
`;

const RecommendedColor = css`
  color: var(--colors-recommended);
`;

const ExcessiveColor = css`
  color: var(--colors-delete-red);
`;
export default CircularChart;
