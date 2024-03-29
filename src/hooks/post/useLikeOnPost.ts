import { getMyLikeOnPost, undoLikePost, likePost } from '@/api/likes';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

export const useLikeOnPost = (postId: string | undefined) => {
  const queryClient = useQueryClient();
  const { signedIn } = useGetSignedIn();

  const { data: myLike } = useQuery({
    queryKey: ['myLike', postId],
    queryFn: () => {
      return getMyLikeOnPost(postId as string);
    },
    enabled: !!postId && !!signedIn
  });

  const toggleLike = myLike && myLike.success ? undoLikePost : likePost;
  const { mutate } = useMutation({ mutationFn: toggleLike });
  const handleLikeOnPost = () => {
    mutate(postId as string, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['socialCounts', postId] });
        queryClient.invalidateQueries({ queryKey: ['myLike', postId] });
      }
    });
  };
  return { myLike, handleLikeOnPost };
};
