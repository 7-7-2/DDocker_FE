import { TREND_TEXTS } from '@/constants/texts';
import { SectionHeader } from '@/styles/styles';
import DailyTrendSlider from '@/components/posts/trend/DailyTrendSlider';

//TODO : new UI
const PostsDailyPopular = () => {
  return (
    <>
      <h3 className={SectionHeader}>{TREND_TEXTS.daily}</h3>
      <DailyTrendSlider />
    </>
  );
};

export default PostsDailyPopular;
