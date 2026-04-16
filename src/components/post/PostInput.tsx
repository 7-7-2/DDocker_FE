import { memo } from 'react';
import { RefObject } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { Input } from '@/components/common/Input';
import { useInput } from '@/hooks/useInput';
import { useGetSignedIn } from '@/hooks/useGetSignedIn';
import { writeComment, replyComment } from '@/api/post';
import { replyState } from '@/atoms/atoms';
import { INPUT_TEXTS } from '@/constants/common';
import { styled } from 'styled-system/jsx';

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
    const commentValue =
      selectedReply && selectedReply.id === 0
        ? {
            parentId: commentTo,
            content: value
          }
        : {
            postId: postId,
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
      <Container>
        <Input
          type={comment.typeName}
          handleEvent={handleSubmitComment}
          handleKeyDown={handleSubmitCommentByEnter}
          inputRef={inputRef}
          inputValue={value}
          handleChange={onChange}
        />
      </Container>
    );
  }
);

const Container = styled.div`
  padding: 10px 0;
`;

export default PostInput;
