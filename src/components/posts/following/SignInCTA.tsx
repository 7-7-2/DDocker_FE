import CTA from '@/components/common/CTA';
import { CTA_TEXTS } from '@/constants/texts';
import { CTAContainer } from '@/styles/styles';
import { useNavigateTo } from '@/hooks/useNavigateTo';

const SignInCTA = () => {
  const toSignIn = useNavigateTo('/start/1');
  return (
    <div className={CTAContainer}>
      <CTA
        text={CTA_TEXTS.signIn}
        actionText={CTA_TEXTS.signInAction}
        fn={toSignIn}
      />
    </div>
  );
};

export default SignInCTA;
