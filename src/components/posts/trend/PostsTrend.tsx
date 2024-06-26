import { useEffect, useRef, useState } from 'react';

import FloatingBtn from '@/components/posts/trend/FloatingBtn';
import PostsBrandPopular from '@/components/posts/trend/PostsBrandPopular';
import PostsDailyPopular from '@/components/posts/trend/PostsDailyPopular';
import BrandCarousel from '@/components/posts/trend/carousel/BrandCarousel';

import SEOMeta from '@/components/common/SEOMeta';
import SEO_DATA from '@/constants/SEOData';

import { cx } from 'styled-system/css';
import { PaddingB20, PaddingT20, TrendDivider } from '@/styles/styles';

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
      <div className={cx(PaddingT20, PaddingB20)}>
        <PostsDailyPopular />
        <div
          className={TrendDivider}
          ref={ref}
        />
        <BrandCarousel />
        <PostsBrandPopular />
        {viewFloat && <FloatingBtn targetRef={ref} />}
      </div>
    </>
  );
};

export default PostsTrend;
