import { commentState } from '@/atoms/atoms';
import { useRef, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export const useDetectSlide = (comment: boolean, id: number) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isIntersected, setIsIntersected] = useState(false);

  const selectedComment = useRecoilValue(commentState);
  const initialDisplay = selectedComment.commentId === 0;
  const isSelected =
    selectedComment.comment === comment && selectedComment.commentId === id;

  useEffect(() => {
    if (!scrollRef.current) return;
    if (!isSelected && !initialDisplay) {
      scrollRef.current.scrollIntoView({
        behavior: 'instant',
        inline: 'center'
      });
      setIsIntersected(false);
    }
  }, [isSelected]);

  return {
    scrollRef,
    setIsIntersected,
    isIntersected
  };
};
