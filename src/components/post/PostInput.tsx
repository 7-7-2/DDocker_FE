import { INPUT_TEXTS } from '@/constants/common';
import { PaddingTB10 } from '@/styles/styles';
import { Input } from '@/components/common/Input';
import { RefObject } from 'react';
import { useInput } from '@/hooks/useInput';
import { useMutation } from '@tanstack/react-query';
import { writeComment, replyComment } from '@/api/post';
import { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { replyState } from '@/atoms/atoms';
import { useQueryClient } from '@tanstack/react-query';

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

    const queryClient = useQueryClient();
    const signedIn = queryClient.getQueryData(['signedIn']);

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
            setValue('');
          }
        });
    };

    return (
      <div className={PaddingTB10}>
        <Input
          type={comment.typeName}
          handleEvent={handleSubmitComment}
          inputRef={inputRef}
          inputValue={value}
          handleChange={onChange}
        />
      </div>
    );
  }
);

export default PostInput;
