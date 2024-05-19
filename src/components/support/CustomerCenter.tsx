import Taps from '@/components/common/Taps';
import FAQ from '@/components/support/FAQ';
import Notice from '@/components/support/Notice';
import { useSelectTap } from '@/hooks/useSelectTap';
import { CUSTOMER_SUPPORT_TEXTS } from '@/constants/support';

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
