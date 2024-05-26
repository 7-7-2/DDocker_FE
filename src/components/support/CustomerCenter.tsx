import { lazy } from 'react';
import Taps from '@/components/common/Taps';
import { useSelectTap } from '@/hooks/useSelectTap';
import { CUSTOMER_SUPPORT_TEXTS } from '@/constants/support';

const FAQ = lazy(() => import('@/components/support/FAQ'));
const Notice = lazy(() => import('@/components/support/Notice'));

const { taps } = CUSTOMER_SUPPORT_TEXTS;

const CustomerCenter = () => {
  const { seletedTap, handleSelectTap } = useSelectTap(taps[0]);
  return (
    <>
      <Taps
        taps={taps}
        selectedTab={seletedTap}
        handleButtonTouch={handleSelectTap}
      />
      {seletedTap === taps[0] ? <Notice /> : <FAQ />}
    </>
  );
};

export default CustomerCenter;
