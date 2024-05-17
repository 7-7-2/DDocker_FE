import { css } from 'styled-system/css';

export const getIconSize = (comment: boolean, mini: boolean, post: boolean) => {
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

export const getIconPropSize = (
  comment: boolean,
  mini: boolean,
  post: boolean
) => {
  if (post) {
    return '44';
  }
  if (mini) {
    return '40';
  }
  if (comment) {
    return '36';
  }
  return undefined;
};

export const getIconType = (comment: boolean, mini: boolean, post: boolean) => {
  if (post) {
    return 'post-user';
  }
  if (mini) {
    return 'mini-user';
  }
  if (comment) {
    return 'comment-user';
  }
  return '';
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
