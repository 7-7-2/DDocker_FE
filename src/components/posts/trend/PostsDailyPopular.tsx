import DailyTrendSlider from '@/components/posts/trend/DailyTrendSlider';
import { TREND_TEXTS } from '@/constants/texts';
import { SectionHeaderText } from '@/styles/styles';

const PostsDailyPopular = () => {
  return (
    <>
      <h3 className={SectionHeaderText}>{TREND_TEXTS.daily}</h3>
      <DailyTrendSlider />
    </>
  );
};

export default PostsDailyPopular;
