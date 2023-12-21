import Notice from '@/components/notification/Notice';
import ProfileIcon from '@/components/notification/ProfileIcon';
import Button from '@/components/common/Button';
import useFollowBtn from '@/hooks/useFollowBtn';
import { NOTICE_TEXTS } from '@/constants/notification';
import { BUTTON_TEXTS } from '@/constants/common';
import { styled } from 'styled-system/jsx';
import { Align } from '@/styles/layout';
import { css, cx } from 'styled-system/css';

const { following, follow2 } = BUTTON_TEXTS;

// DB사용시 데이터 형식에 맞춰 PROPS 전달받게 수정
const NoticeItem = ({ img = false }: { img?: boolean }) => {
  const { toggleFollow, setToggleFollow } = useFollowBtn();
  const handleToggle = () => setToggleFollow(!toggleFollow);

  return (
    <Container className={Align}>
      <ProfileIcon />
      <Notice
        username="예시유저"
        text={NOTICE_TEXTS.follow}
        time="12분 전"
      />
      <Right>
        {img && <img src="" />}
        {!img && (
          <Button
            text={toggleFollow ? following : follow2}
            onTouchEnd={handleToggle}
            className={cx(
              FollowBtnCommon,
              toggleFollow ? FollowingBtnStyle : FollowBtnStyle
            )}
          />
        )}
      </Right>
    </Container>
  );
};

const Container = styled.div`
  padding-bottom: 20px;
`;

const Right = styled.div``;

const FollowBtnCommon = css`
  width: 80px;
  height: 30px;
  border-radius: 6px;
  font-size: var(--font-sizes-xs);
  font-weight: 500;
  line-height: 20px;
`;

const FollowBtnStyle = css`
  background-color: var(--colors-main);
  color: #fff;
`;

const FollowingBtnStyle = css`
  background-color: var(--colors-tertiary);
`;

export default NoticeItem;
