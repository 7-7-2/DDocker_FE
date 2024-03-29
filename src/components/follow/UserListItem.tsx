import MiniProfile from '@/components/common/MiniProfile';
import { SimplifyUser } from '@/types/types';
import { Align, Between } from '@/styles/layout';
import { PaddingB20, PaddingT20 } from '@/styles/styles';
import { styled } from 'styled-system/jsx';
import { cx } from 'styled-system/css';
import FollowBtn from '@/components/follow/FollowBtn';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import {
  FollowerListIQParam,
  FollowingListIQParam
} from '@/hooks/useInfiniteScroll';
import { useTargetInfiniteScroll } from '@/hooks/useTargetInfiniteScroll';
import EmptyFollow from '@/components/follow/EmptyFollow';
import { useNavigate } from 'react-router-dom';

const UserListItem = ({
  activeTab,
  pageUserId
}: {
  activeTab: string;
  pageUserId: string | undefined;
}) => {
  const navigate = useNavigate();
  const toProfile = (userId: string | undefined) => () =>
    navigate(`/profile/${userId}`);
  const activeParam =
    activeTab === '팔로워' ? FollowerListIQParam() : FollowingListIQParam();
  const { userId: myId } = useCachedUserInfo();
  const { followingList, followerList, ref } = useTargetInfiniteScroll(
    activeParam,
    activeTab
  );
  const isFollowingTab = activeTab === '팔로잉';
  const isFollowerTab = activeTab === '팔로워';
  return (
    <div className={PaddingB20}>
      {followingList &&
        followingList.map(
          ({ url, nickname, caffeine, userId }: SimplifyUser) => (
            <div
              key={userId}
              className={cx(Align, Between, PaddingT20)}>
              <MiniProfile
                url={url}
                nickname={nickname}
                caffeine={caffeine}
                onClick={toProfile(userId)}
              />
              {userId !== myId && <FollowBtn userId={userId} />}
            </div>
          )
        )}
      {followerList &&
        followerList.map(
          ({ url, nickname, caffeine, userId }: SimplifyUser) => (
            <div
              key={userId}
              className={cx(Align, Between, PaddingT20)}>
              <MiniProfile
                url={url}
                nickname={nickname}
                caffeine={caffeine}
                onClick={toProfile(userId)}
              />
              {userId !== myId && <FollowBtn userId={userId} />}
            </div>
          )
        )}
      {isFollowingTab && followingList && followingList?.length === 0 && (
        <EmptyFollow
          activeTab={activeTab}
          pageUserId={pageUserId}
        />
      )}
      {isFollowerTab && followerList && followerList?.length === 0 && (
        <EmptyFollow
          activeTab={activeTab}
          pageUserId={pageUserId}
        />
      )}
      <Target ref={ref} />
    </div>
  );
};

const Target = styled.div`
  padding: 1px;
`;

export default UserListItem;
