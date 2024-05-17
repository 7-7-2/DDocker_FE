import Notice from '@/components/notification/Notice';
import { NOTICE_TEXTS } from '@/constants/notification';
import { styled } from 'styled-system/jsx';
import { Align } from '@/styles/layout';
import { Notification } from '@/types/types';
import FollowBtn from '@/components/follow/FollowBtn';
import { useCachedUserInfo } from '@/hooks/useCachedUserInfo';
import getTimeDiff from '@/utils/timestampToDate';
import { useState } from 'react';
import { useNavigateTo } from '@/hooks/useNavigateTo';
import ImgContainer from '@/components/common/ImgContainer';
import NoProfileImg from '@/components/common/NoProfileImg';

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

  const handleImgError = () => {
    setProfileImg('');
  };

  const postImgPath = postId && `${postImagePath}%2F${myId}%2F${postId}`;

  return (
    <Container className={Align}>
      {profileImg && (
        <ImgContainer
          url={profileImg}
          mini={true}
          onClick={toProfile}
          onError={handleImgError}
        />
      )}
      {!profileImg && (
        <NoProfileImg
          onClick={toProfile}
          mini={true}
        />
      )}
      <Notice
        username={nickname}
        text={NOTICE_TEXTS[type]}
        time={getTimeDiff(time)}
        onClick={followNotice ? toProfile : toPost}
      />
      <Right>
        {!followNotice && (
          <PostImg
            src={postImgPath}
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

const PostImg = styled.img`
  min-width: 44px;
  height: 44px;
  border-radius: 6px;
`;

const Min = styled.div`
  min-width: 40px;
`;

export default NoticeItem;
