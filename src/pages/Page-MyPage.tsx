import MyProfile from '@/components/mypage/MyProfile';
import SEOMeta from '@/components/common/SEOMeta';
import SEO_DATA from '@/constants/SEOData';

export const MyPage = () => {
  return (
    <>
      <SEOMeta pageData={SEO_DATA.myPage} />
      <MyProfile />
    </>
  );
};

export default MyPage;
