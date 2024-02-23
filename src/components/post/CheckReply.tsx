import { styled } from 'styled-system/jsx';
import { COMMENT_TEXTS } from '@/constants/texts';

const { hide, loadMore } = COMMENT_TEXTS;

const CheckReply = ({
  count,
  replies,
  handleShowReplies
}: {
  count: number;
  replies: boolean;
  handleShowReplies: () => void;
}) => {
  return (
    <>
      {count !== 0 && !replies && (
        <ToggleReply
          onClick={handleShowReplies}>{`${count}${loadMore}`}</ToggleReply>
      )}
      {count !== 0 && replies && (
        <ToggleReply onClick={handleShowReplies}>{hide}</ToggleReply>
      )}
    </>
  );
};

const ToggleReply = styled.div`
  font-size: var(--font-sizes-sm);
  color: #767676;
  font-weight: 500;
  padding-left: 44px;
  padding-bottom: 20px;
  margin-top: -12px;
  line-height: 20px;
`;

export default CheckReply;
