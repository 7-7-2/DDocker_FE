import { css } from 'styled-system/css';

const getIconSize = (comment: boolean, mini: boolean, post: boolean) => {
  if (post) {
    return Container;
  }
  if (mini) {
    return MiniSize;
  }
  if (comment) {
    return CommentSize;
  }
  return undefined;
};

const ImgContainer = ({
  url,
  comment = false,
  mini = false,
  post = false,
  onClick
}: {
  url: string;
  comment?: boolean;
  mini?: boolean;
  post?: boolean;
  onClick?: () => void;
}) => {
  return (
    <img
      className={getIconSize(comment, mini, post)}
      src={url}
      onClick={onClick}
    />
  );
};

const Container = css`
  min-width: 44px;
  height: 44px;
  border-radius: 50%;
`;
const CommentSize = css`
  min-width: 36px;
  height: 36px;
  border-radius: 50%;
`;
const MiniSize = css`
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export default ImgContainer;
