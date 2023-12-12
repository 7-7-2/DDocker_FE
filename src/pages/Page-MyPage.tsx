import MyProfile from '@/components/mypage/MyProfile';
import { useComposeHeader } from '@/hooks/useComposeHeader';

export const MyPage = () => {
  useComposeHeader(false, ' 프로필 수정', 'icons');
  return (
    <>
      <MyProfile />
    </>
  );
};

export default MyPage;
