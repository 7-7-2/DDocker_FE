import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isModalState } from '@/atoms/atoms';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';

export const useVerifyModalCTA = () => {
  const [isModal, setIsModal] = useRecoilState(isModalState);
  const { signedIn } = useGetSignedIn();

  useEffect(() => {
    !signedIn && setIsModal(true);
  }, []);

  return { isModal, setIsModal };
};
