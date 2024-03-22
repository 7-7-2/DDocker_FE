import { FlexCenter } from '@/styles/layout';
import CTA from '@/components/common/CTA';
import { CTA_TEXTS } from '@/constants/texts';
import { css, cx } from 'styled-system/css';
import { Default } from '@/styles/styles';
import { useQuery } from '@tanstack/react-query';
import useGetCacheData from '@/hooks/useGetCacheData';
import { useNavigateTo } from '@/hooks/useNavigateTo';

const PostDiscoveryCTA = () => {
  const { data: signedIn } = useQuery({
    queryKey: ['signedIn'],
    queryFn: () => useGetCacheData('user', '/accessToken')
  });

  const toRegister = useNavigateTo('/post/register');
  const toSignIn = useNavigateTo('/start/1');
  const publicAction = () => {
    toSignIn();
  };
  const privateAction = () => {
    toRegister();
  };

  return (
    <div className={cx(FlexCenter, Container, Default)}>
      <CTA
        text={CTA_TEXTS.trend}
        actionText={CTA_TEXTS.trendAction}
        fn={signedIn ? privateAction : publicAction}
      />
    </div>
  );
};

const Container = css`
  padding: 40px 0;
  border-radius: 16px;
`;

export default PostDiscoveryCTA;
