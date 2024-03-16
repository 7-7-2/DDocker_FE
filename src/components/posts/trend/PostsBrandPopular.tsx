import { TREND_TEXTS } from '@/constants/texts';
import { SectionHeader } from '@/styles/styles';

const PostsBrandPopular = () => {
  return (
    <div>
      <h3 className={SectionHeader}>{TREND_TEXTS.popular}</h3>
    </div>
  );
};

export default PostsBrandPopular;
