import { authState } from '@/atoms/atoms';
import Button from '@/components/common/Button';
import { useComposeHeader } from '@/hooks/useComposeHeader';
import { Grid } from '@/styles/layout';
import {
  Btn,
  DefaultBtn,
  FollowBtn,
  FollowBtnSm,
  FollowingBtn,
  FollowingBtnSm,
  LoginBtn,
  RegistBtn
} from '@/styles/styles';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-system/jsx';

const Home = () => {
  useComposeHeader(true, '', 'icons');
  const { user } = useRecoilValue(authState);
  console.log(user);
  const test = () => {
    console.log(Btn);
  };
  return (
    <>
      <Gap className={Grid}>
        <Button
          text="다음으로"
          onTouchEnd={test}
          className={DefaultBtn}
        />
        <Button
          text="등록하기"
          onTouchEnd={test}
          className={RegistBtn}
        />
        <Button
          text="로그인"
          onTouchEnd={test}
          className={LoginBtn}
        />
        <Button
          text="팔로우"
          onTouchEnd={test}
          className={FollowBtn}
        />
        <Button
          text="팔로잉"
          onTouchEnd={test}
          className={FollowingBtn}
        />
        <Button
          text="팔로우"
          onTouchEnd={test}
          className={FollowBtnSm}
        />
        <Button
          text="팔로잉"
          onTouchEnd={test}
          className={FollowingBtnSm}
        />
      </Gap>
    </>
  );
};

export default Home;
const Gap = styled.div`
  grid-template-columns: 1fr;
  gap: 20px 0;
`;
