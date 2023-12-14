import MyProfile from '@/components/mypage/MyProfile';
import { useComposeHeader } from '@/hooks/useComposeHeader';

export const MyPage = () => {
  useComposeHeader(true, '', 'icons');
  return (
    <>
      <MyProfile />
    </>
  );
};

export default MyPage;
