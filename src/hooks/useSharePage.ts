import toast from 'react-hot-toast';
import { useRecoilValue } from 'recoil';
import { TOAST_TEXT } from '@/constants/common';
import { userInfoState } from '@/atoms/atoms';
import { useLocation } from 'react-router-dom';

const { style: toastStyle, text } = TOAST_TEXT;
export const useSharePage = () => {
  const { pathname } = useLocation();
  const { nickname: profileNickname } = useRecoilValue(userInfoState);
  const brand = pathname.startsWith('/brand');
  const profile = pathname.startsWith('/profile');

  const copyClipBorad = async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      toast.success(text.clipboard.success, toastStyle);
    } catch (error) {
      toast.error(text.clipboard.error, toastStyle);
    }
  };
  const handleShare = async () => {
    if (profile && navigator.share) {
      try {
        await navigator.share({
          title: `DDocker - 똑커, 똑똑한 커피 생활`,
          text: `${profileNickname}의 프로필을 확인해보세요!`,
          url: location.href
        });
      } catch (error) {
        copyClipBorad();
      }
    } else {
      copyClipBorad();
    }

    if (brand && navigator.share) {
      try {
        await navigator.share({
          title: `DDocker - 똑커, 똑똑한 커피 생활`,
          text: `${profileNickname}이 공유하신 커피의 정보를 확인해보세요!`,
          url: location.href
        });
      } catch (error) {
        copyClipBorad();
      }
    } else {
      copyClipBorad();
    }
  };

  return handleShare;
};
