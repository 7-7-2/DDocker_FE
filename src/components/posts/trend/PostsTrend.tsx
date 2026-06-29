import { useEffect, useRef, useState } from 'react';

import DailyTrendSlider from '@/components/posts/trend/DailyTrendSlider';
import BrandCarousel from '@/components/posts/trend/carousel/BrandCarousel';
import PostsBrandPopular from '@/components/posts/trend/PostsBrandPopular';
import FloatingBtn from '@/components/posts/trend/FloatingBtn';

import SEOMeta from '@/components/common/SEOMeta';
import SEO_DATA from '@/constants/SEOData';
import { TREND_TEXTS } from '@/constants/texts';

import { cx } from 'styled-system/css';
import { MarginT24, SectionHeaderText, TrendDivider } from '@/styles/styles';

const PostsTrend = () => {
  const [viewFloat, setViewFloat] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      entry.boundingClientRect.top < 38.7 && setViewFloat(true);
      entry.boundingClientRect.top > 38.7 && setViewFloat(false);
    });
  };
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callback);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, callback]);

  return (
    <>
      <SEOMeta pageData={SEO_DATA.postsTrend} />
      <div>
        <h3 className={cx(SectionHeaderText, MarginT24)}>
          {TREND_TEXTS.daily}
        </h3>
        <DailyTrendSlider />
      </div>
      <div
        className={TrendDivider}
        ref={ref}
      />
      <BrandCarousel />
      <PostsBrandPopular />
      {viewFloat && <FloatingBtn targetRef={ref} />}
    </>
  );
};

export default PostsTrend;
