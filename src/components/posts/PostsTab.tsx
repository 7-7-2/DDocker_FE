const PostsTab = ({ tab, onClick }: { tab: string; onClick: () => void }) => {
  return <div onClick={onClick}>{tab}</div>;
};

export default PostsTab;
