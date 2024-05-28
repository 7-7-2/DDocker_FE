import { INPUT_TEXTS } from '@/constants/common';
import { PaddingTB10 } from '@/styles/styles';
import { Input } from '@/components/common/Input';
import { RefObject } from 'react';
import { useInput } from '@/hooks/useInput';
import { useMutation } from '@tanstack/react-query';
import { writeComment, replyComment } from '@/api/post';
import { memo } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { replyState } from '@/atoms/atoms';
import { useQueryClient } from '@tanstack/react-query';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';

const { type } = INPUT_TEXTS;
const { comment } = type;

const PostInput = memo(
  ({
    inputRef,
    postId
  }: {
    inputRef: RefObject<HTMLInputElement>;
    postId: string;
  }) => {
    const { value, setValue, onChange } = useInput();
    const selectedReply = useRecoilValue(replyState);
    const reset = useResetRecoilState(replyState);
    const queryClient = useQueryClient();

    const { signedIn } = useGetSignedIn();

    const commentTo =
      selectedReply && selectedReply.id === 0 ? postId : selectedReply.id;
    const commentValue = {
      parentId: commentTo,
      content: value
    };

    const commentOrReply =
      selectedReply && selectedReply.id === 0 ? writeComment : replyComment;
    const { mutate } = useMutation({ mutationFn: commentOrReply });
    const handleSubmitComment = () => {
      signedIn &&
        mutate(commentValue, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['commentData', postId]
            });
            queryClient.invalidateQueries({
              queryKey: ['socialCounts', postId]
            });
            if (selectedReply && selectedReply.id !== 0) {
              queryClient.invalidateQueries({
                queryKey: ['replyList', selectedReply.id]
              });
            }

            setValue('');
            reset();
            if (inputRef && inputRef.current) {
              inputRef?.current.blur();
            }
          }
        });
    };
    const handleSubmitCommentByEnter = (
      e: React.KeyboardEvent<HTMLDivElement>
    ) => {
      if (e.key === 'Enter') {
        handleSubmitComment();
      }
    };

    return (
      <div className={PaddingTB10}>
        <Input
          type={comment.typeName}
          handleEvent={handleSubmitComment}
          handleKeyDown={handleSubmitCommentByEnter}
          inputRef={inputRef}
          inputValue={value}
          handleChange={onChange}
        />
      </div>
    );
  }
);

export default PostInput;
