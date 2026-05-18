import {
  Pie,
  PieChart,
  PieLabelRenderProps,
  PieSectorShapeProps,
  Sector
} from 'recharts';

import LegendMarker from '@/components/coffee/LegendMarker';

import { COFFEE_ANALYSIS_TEXTS } from '@/constants/coffee';

import { cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { Align, Column, Flex } from '@/styles/layout';
import { Gap8, Medium } from '@/styles/styles';
import {
  CaffeineHistoryTypes,
  CalendarData,
  DonutChartDataType
} from '@/types/types';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const { donutChart } = COFFEE_ANALYSIS_TEXTS;

const data = [
  { name: '아메리카노', value: 400 },
  { name: '카페라떼', value: 300 },
  { name: '에너지드링크', value: 200 }
];

const DonutChart = ({
  calendarData,
  activeMonth
}: {
  calendarData: CaffeineHistoryTypes;
  activeMonth: string;
}) => {
  const [chartData, setChartData] = useState<DonutChartDataType[]>([]);
  const getDaysInMonth = (activeDate: string | Date) => {
    const daysInMonth = dayjs(activeDate).daysInMonth();
    const currentMonth =
      dayjs().format('YYYY-MM') === dayjs(activeDate).format('YYYY-MM');
    if (currentMonth) return Number(dayjs().format('D'));
    else return daysInMonth;
  };

  useEffect(() => {
    const daysInMonth = getDaysInMonth(activeMonth);
    const res = handleFilteringData(calendarData.summary, daysInMonth);
    res && setChartData(res);
  }, [activeMonth]);

  const handleFilteringData = (data: CalendarData[], daysInMonth: number) => {
    const coffeeData = data;

    const healthy = daysInMonth - coffeeData?.length;
    console.log('🚀 ~ handleFilteringData ~ daysInMonth:', daysInMonth);
    console.log('🚀 ~ handleFilteringData ~ healthy:', healthy);

    const recommended = coffeeData?.filter(
      item => item && Number(item.caffeineSum) <= 400
    ).length;

    const excessive = coffeeData?.filter(
      item => item && Number(item.caffeineSum) > 401
    ).length;

    return [
      { name: 'recommended', value: recommended },
      { name: 'excessive', value: excessive },
      { name: 'healthy', value: healthy }
    ];
  };

  const RADIAN = Math.PI / 180;
  const COLORS = ['#2DCD9D', '#FF391E', '#CCCCCC'];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }: PieLabelRenderProps) => {
    if (
      cx == null ||
      cy == null ||
      innerRadius == null ||
      outerRadius == null
    ) {
      return null;
    }
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const ncx = Number(cx);
    const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const ncy = Number(cy);
    const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: '15px',
          fontWeight: '600',
          pointerEvents: 'none'
        }}>
        {`${((percent ?? 1) * 100).toFixed(0)}%`}
      </text>
    );
  };

  const MyCustomPie = (props: PieSectorShapeProps) => {
    return (
      <Sector
        {...props}
        fill={COLORS[props.index % COLORS.length]}
      />
    );
  };

  return (
    <Container className={cx(Flex, Align)}>
      <PieChart
        width={172}
        height={172}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Pie
          data={chartData}
          labelLine={false}
          label={renderCustomizedLabel}
          dataKey="value"
          isAnimationActive={true}
          innerRadius={37}
          outerRadius={86}
          shape={MyCustomPie}
          cx="50%"
          cy="50%"
          endAngle={450}
          startAngle={90}
          stroke="none"
        />
      </PieChart>

      <Legend className={Column}>
        {donutChart.legend.map(item => (
          <div
            key={item.key}
            className={cx(Flex, Align, Gap8, Medium)}>
            <LegendMarker
              legend={item.key}
              type="chart"
            />
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

const Legend = styled.div`
  font-size: var(--font-sizes-sm);
  color: var(--colors-main-dark);
  gap: 10px;
`;
export default DonutChart;
