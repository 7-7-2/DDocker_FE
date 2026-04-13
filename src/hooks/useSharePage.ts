import toast from 'react-hot-toast';
import { useRecoilValue } from 'recoil';
import { TOAST_TEXT } from '@/constants/common';
import { userInfoState } from '@/atoms/atoms';

const { style: toastStyle, text } = TOAST_TEXT;
export const useSharePage = () => {
  const { nickname: profileNickname } = useRecoilValue(userInfoState);

  const copyClipBorad = async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      toast.success(text.clipboard.success, toastStyle);
    } catch (error) {
      toast.error(text.clipboard.error, toastStyle);
    }
  };
  const handleShare = async () => {
    if (navigator.share) {
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
  };

  return handleShare;
};
