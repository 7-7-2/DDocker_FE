import { styled } from 'styled-system/jsx';
import { COMMENT_TEXTS } from '@/constants/texts';
import { useContext } from 'react';
import { InputContext } from '@/context/inputContext';
import { memo } from 'react';
import { replyState } from '@/atoms/atoms';
import { useSetRecoilState } from 'recoil';
import { CommentProto } from '@/types/types';

const { reply } = COMMENT_TEXTS;

const Reply = memo(
  ({ nickname, id }: Pick<CommentProto, 'nickname' | 'id'>) => {
    const { inputRef } = useContext(InputContext);
    const setReplyState = useSetRecoilState(replyState);

    const focusInput = () => {
      if (inputRef && inputRef.current) {
        setReplyState({ nickname: nickname, id: id as number });
        inputRef.current.value = '';
        inputRef.current?.focus();
      }
    };

    return <ReplyComment onClick={focusInput}>{reply}</ReplyComment>;
  }
);

const ReplyComment = styled.div`
  padding-left: 12px;
`;

export default Reply;
