import Notice from '@/components/notification/Notice';
import { NOTICE_TEXTS } from '@/constants/notification';
import { styled } from 'styled-system/jsx';
import { Align } from '@/styles/layout';
import { Notification } from '@/types/types';
import FollowBtn from '@/components/follow/FollowBtn';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import getTimeDiff from '@/utils/timestampToDate';
import { getUserProfile } from '@/api/user';
import { useState } from 'react';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import ImgContainer from '@/components/common/ImgContainer';

const userImagePath = import.meta.env.VITE_R2_USER_IMAGE_PATH;
const postImagePath = import.meta.env.VITE_R2_POST_IMAGE_PATH;

const NoticeItem = ({
  type,
  postId = '',
  senderId,
  nickname,
  time
}: Notification) => {
  const followNotice = type === 'follow';
  const toProfile = useNavigateTo(`/profile/${senderId}`);
  const toPost = useNavigateTo(`/post/${postId}`);

  const { userId: myId } = useCachedUserInfo();
  const profileImgPath = senderId && `${userImagePath}%2F${senderId}`;
  const [profileImg, setProfileImg] = useState(profileImgPath);

  const getExternalProfileImg = async () => {
    const imgSrc = await getUserProfile(senderId);
    setProfileImg(imgSrc);
  };

  const postImgPath = postId && `${postImagePath}%2F${myId}%2F${postId}`;

  return (
    <Container className={Align}>
      <ProfileIcon
        src={profileImg}
        onError={getExternalProfileImg}
        onClick={toProfile}
      />
      <Notice
        username={nickname}
        text={NOTICE_TEXTS[type]}
        time={getTimeDiff(time)}
        onClick={followNotice ? toProfile : toPost}
      />
      <Right>
        {!followNotice && (
          <ImgContainer
            url={postImgPath}
            mini={true}
            onClick={toPost}
          />
        )}
        {followNotice && <FollowBtn userId={senderId} />}
      </Right>
    </Container>
  );
};

const Container = styled.div`
  padding-bottom: 20px;
`;

const Right = styled.div``;

const ProfileIcon = styled.img`
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const PostImg = styled.img`
  min-width: 44px;
  height: 44px;
  border-radius: 6px;
`;

export default NoticeItem;
