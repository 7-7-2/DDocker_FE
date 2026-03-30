import { TREND_TEXTS } from '@/constants/texts';
import { Semibold } from '@/styles/styles';

const TrendBubbleText = ({ productName }: { productName: string }) => {
  return (
    <div>
      {TREND_TEXTS.WeeklyPopular}
      <span className={Semibold}>{productName}</span>
      {TREND_TEXTS.is}
    </div>
  );
};

export default TrendBubbleText;
