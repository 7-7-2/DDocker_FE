import { TREND_TEXTS } from '@/constants/texts';
import { Semibold } from '@/styles/styles';

const TrendBubbleText = ({ productName }: { productName: string }) => {
  return (
    <div>
      {productName ? (
        <>
          {TREND_TEXTS.weeklyPopular.pre}
          <span className={Semibold}>{productName}</span>
          {TREND_TEXTS.weeklyPopular.suf}
        </>
      ) : (
        <span> {TREND_TEXTS.weeklyPopular.empty}</span>
      )}
    </div>
  );
};

export default TrendBubbleText;
