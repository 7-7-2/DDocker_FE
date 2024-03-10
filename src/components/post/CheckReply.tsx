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
        <Container>
          <ToggleReply
            onClick={handleShowReplies}>{`${count}${loadMore}`}</ToggleReply>
        </Container>
      )}
      {count !== 0 && replies && (
        <Container>
          <ToggleReply onClick={handleShowReplies}>{hide}</ToggleReply>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  padding-left: 44px;
  padding-bottom: 20px;
  margin-top: -12px;
  color: #767676;
  font-weight: 500;
  line-height: 20px;
  font-size: var(--font-sizes-sm);
`;

const ToggleReply = styled.span``;

export default CheckReply;
