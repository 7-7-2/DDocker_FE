import CTA from '@/components/common/CTA';
import { CTA_TEXTS } from '@/constants/texts';
import { CTAContainer } from '@/styles/styles';
import { useNavigateTo } from '@/hooks/useNavigateTo';

const FollowDiscoveryCTA = () => {
  const toSearch = useNavigateTo('/search');
  return (
    <div className={CTAContainer}>
      <CTA
        text={CTA_TEXTS.followDiscovery}
        actionText={CTA_TEXTS.followDiscoveryAction}
        fn={toSearch}
      />
    </div>
  );
};

export default FollowDiscoveryCTA;
