import { styled } from 'styled-system/jsx';
import Notice from '@/components/notification/Notice';
import ProfileIcon from '@/components/notification/ProfileIcon';
import { Align } from '@/styles/layout';
import Button from '@/components/common/Button';
import { css, cx } from 'styled-system/css';
import { NOTICE_TEXTS } from '@/constants/notification';

// DB사용시 데이터 형식에 맞춰 PROPS 전달받게 수정
const NoticeItem = () => {
  return (
    <Container className={Align}>
      <ProfileIcon />
      <Notice
        username="예시유저"
        text={NOTICE_TEXTS.follow}
        time="12분 전"
      />
      <Right>
        <Button
          text="팔로잉"
          onTouchEnd={() => console.log('clicked')}
          className={cx(FollowBtnCommon, FollowingBtnStyle)}
        />
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

// const FollowBtnStyle = css`
//   background-color: var(--colors-main);
//   color: #fff;
// `;

const FollowingBtnStyle = css`
  background-color: var(--colors-tertiary);
`;

export default NoticeItem;
