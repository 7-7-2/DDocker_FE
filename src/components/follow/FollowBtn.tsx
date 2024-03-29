import Button from '@/components/common/Button';
import { cx } from 'styled-system/css';
import {
  FollowBtnCommon,
  FollowingBtnStyle,
  FollowBtnStyle
} from '@/styles/styles';
import { BUTTON_TEXTS } from '@/constants/common';
import { checkFollowing } from '@/api/follow';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { followUser, unfollowUser } from '@/api/follow';

const { following, follow2 } = BUTTON_TEXTS;

const FollowBtn = ({ userId }: { userId: string | undefined }) => {
  const queryClient = useQueryClient();
  const { data: isFollowing } = useQuery({
    queryKey: ['isFollowing', userId],
    queryFn: () => {
      return userId && checkFollowing(userId);
    },
    enabled: !!userId
  });

  const toggleFollow =
    isFollowing && isFollowing.data ? unfollowUser : followUser;

  const { mutate } = useMutation({ mutationFn: toggleFollow });
  const handleFollowUser = () => {
    mutate(userId as string, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['isFollowing', userId] });
      }
    });
  };

  return (
    <>
      <Button
        text={isFollowing && isFollowing.data ? following : follow2}
        onTouchEnd={handleFollowUser}
        className={cx(
          FollowBtnCommon,
          isFollowing && isFollowing.data ? FollowingBtnStyle : FollowBtnStyle
        )}
      />
    </>
  );
};

export default FollowBtn;
