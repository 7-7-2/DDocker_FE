import { lazy, Suspense } from 'react';
import Taps from '@/components/common/Taps';
import SEOMeta from '@/components/common/SEOMeta';
import SEO_DATA from '@/constants/SEOData';
import { CUSTOMER_SUPPORT_TEXTS } from '@/constants/support';
import { useSelectTap } from '@/hooks/useSelectTap';

const FAQ = lazy(() => import('@/components/support/FAQ'));
const Notice = lazy(() => import('@/components/support/Notice'));

const { taps } = CUSTOMER_SUPPORT_TEXTS;

const CustomerCenter = () => {
  const { seletedTap, handleSelectTap } = useSelectTap(taps[0]);
  return (
    <>
      <SEOMeta pageData={SEO_DATA.support} />
      <Taps
        taps={taps}
        selectedTab={seletedTap}
        handleButtonClick={handleSelectTap}
      />

      <Suspense>{seletedTap === taps[0] ? <Notice /> : <FAQ />}</Suspense>
    </>
  );
};

export default CustomerCenter;
