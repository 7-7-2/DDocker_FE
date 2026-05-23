import { circularChartSummaryDataTypes } from '@/types/types';
import { COFFEE_ANALYSIS_TEXTS } from '@/constants/coffee';

import { Bold, Caption, PointColor, Summary } from '@/styles/styles';
import { Flex } from '@/styles/layout';

const { unit, circularChart } = COFFEE_ANALYSIS_TEXTS;
const CircularChartSummary = ({
  circularChartSummaryData
}: {
  circularChartSummaryData: circularChartSummaryDataTypes;
}) => {
  const { summary, caption } = circularChart;
  const { intakeDates, recommended, excessive } = circularChartSummaryData;

  const typecheck = recommended > excessive ? 'recommended' : 'excessive';
  const equalType = recommended === excessive && 'equal';
  const nullType = recommended === 0 && excessive === 0;

  return (
    <>
      <Summary className={Bold}>
        {circularChart.summary.pre}
        <div className={Flex}>
          {!equalType ? (
            <span>
              <span className={PointColor}>
                {summary.point[typecheck as keyof typeof summary.point]}
              </span>
              {circularChart.summary.suf}
            </span>
          ) : !nullType ? (
            <span>
              {summary.equal.map((text, idx) =>
                (idx + 2) % 2 === 0 ? (
                  <span
                    className={PointColor}
                    key={idx}>
                    {text}
                  </span>
                ) : (
                  <span key={idx}>{text}</span>
                )
              )}
            </span>
          ) : (
            <span>{summary.null}</span>
          )}
        </div>
      </Summary>
      {!nullType && (
        <Caption>
          {caption.pre}
          {intakeDates}
          {unit.day}
          {caption.mid}
          {equalType ? (
            <span>
              {circularChartSummaryData.recommended}
              {caption.same[0]}
              {circularChartSummaryData.excessive}
              {caption.same[1]}
            </span>
          ) : (
            <span>
              {
                circularChartSummaryData[
                  typecheck as keyof typeof circularChartSummaryData
                ]
              }
              {unit.day}
              {caption.suf[typecheck as keyof typeof caption.suf]}
            </span>
          )}
        </Caption>
      )}
    </>
  );
};

export default CircularChartSummary;
