import { useComposeHeader } from '@/hooks/useComposeHeader';

export const MyPage = () => {
  useComposeHeader(false, ' 프로필 수정', 'icons');
  return <>MYPAGE</>;
};

export default MyPage;
