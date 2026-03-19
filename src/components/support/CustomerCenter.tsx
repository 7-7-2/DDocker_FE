import { lazy, Suspense } from 'react';
import Taps from '@/components/common/Tabs';
import SEOMeta from '@/components/common/SEOMeta';
import SEO_DATA from '@/constants/SEOData';
import { CUSTOMER_SUPPORT_TEXTS } from '@/constants/support';
import { useSelectTab } from '@/hooks/useSelectTab';

const FAQ = lazy(() => import('@/components/support/FAQ'));
const Notice = lazy(() => import('@/components/support/Notice'));

const { tabs } = CUSTOMER_SUPPORT_TEXTS;

const CustomerCenter = () => {
  const { seletedTab, handleSelectTab } = useSelectTab(tabs[0]);
  return (
    <>
      <SEOMeta pageData={SEO_DATA.support} />
      <Taps
        tabs={tabs}
        selectedTab={seletedTab}
        handleButtonClick={handleSelectTab}
      />

      <Suspense>{seletedTab === tabs[0] ? <Notice /> : <FAQ />}</Suspense>
    </>
  );
};

export default CustomerCenter;
