import CTA from '@/components/common/CTA';
import { CTA_TEXTS } from '@/constants/texts';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import { FlexCenter, Justify } from '@/styles/layout';
import { css, cx } from 'styled-system/css';

const EmptyFollow = ({
  activeTab,
  pageUserId
}: {
  activeTab: string;
  pageUserId: string | undefined;
}) => {
  const { userId } = useCachedUserInfo();
  const isMyFollowPage = userId === pageUserId;
  const toSearch = useNavigateTo('/search');

  return (
    <div className={cx(FlexCenter, Container)}>
      <div className={Justify}>
        {activeTab === '팔로워' && <CTA text={CTA_TEXTS.emptyFollower} />}
        {activeTab === '팔로잉' && (
          <CTA
            text={CTA_TEXTS.emptyFollowing}
            btn={isMyFollowPage}
            actionText={isMyFollowPage ? CTA_TEXTS.followDiscoveryAction : ''}
            fn={isMyFollowPage ? toSearch : undefined}
          />
        )}
      </div>
    </div>
  );
};

const Container = css`
  height: calc(100dvh - 136px);
`;

export default EmptyFollow;
