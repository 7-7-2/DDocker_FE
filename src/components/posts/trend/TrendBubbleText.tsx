import { TREND_TEXTS } from '@/constants/texts';
import { Semibold } from '@/styles/styles';

const TrendBubbleText = ({ menu }: { menu: string }) => {
  return (
    <div>
      {TREND_TEXTS.WeeklyPopular}
      <span className={Semibold}>{menu}</span>
      {TREND_TEXTS.is}
    </div>
  );
};

export default TrendBubbleText;
