const Icon = ({
  id,
  size,
  onTouchEnd
}: {
  id: string;
  size: string;
  onTouchEnd?: () => void | ((postId: string) => void);
}) => {
  return (
    <svg
      width={size}
      height={size}
      onTouchEnd={onTouchEnd}>
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
};

export default Icon;
