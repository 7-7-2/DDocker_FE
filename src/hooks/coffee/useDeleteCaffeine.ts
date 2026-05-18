import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteCaffeineIntake, getPostId } from '@/api/coffee';
import { useVerifyModalCTA } from '@/hooks/useVerifyModalCTA';
import { TOAST_TEXT } from '@/constants/common';
const { text, style: toastStyle } = TOAST_TEXT;
export const useDeleteCaffeine = (activeMonth: string) => {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState('');
  const [isPost, setIsPost] = useState(false);
  const { isModal, setIsModal } = useVerifyModalCTA();

  const { mutate: handleOnSwipe } = useMutation({
    mutationFn: async (id: string) => {
      setDeleteId(id);
      const res = await getPostId(id);
      return res.postId;
    },
    onSuccess: async data => {
      if (data === null) {
        return;
      } else {
        return setIsPost(true);
      }
    }
  });

  const { mutate: handleDeleteBtn } = useMutation({
    mutationFn: async () => {
      console.log('DELETE');
      await deleteCaffeineIntake(deleteId);
      return;
    },
    onSuccess: async () => {
      const toastText = isPost ? text.stats.post : text.stats.intake;
      toast.success(toastText, toastStyle);
      setIsModal(false);
      queryClient.invalidateQueries({
        queryKey: ['coffeeCalendar', activeMonth]
      });
    }
  });

  const handleDeleteModal = () => {
    setIsModal(true);
  };

  return { isModal, isPost, handleOnSwipe, handleDeleteBtn, handleDeleteModal };
};
