const Icon = ({
  id,
  size,
  fill,
  onTouchEnd
}: {
  id: string;
  size: string;
  fill?: string;
  onTouchEnd?: () => void;
}) => {
  return (
    <svg
      width={size}
      height={size}
      fill={fill}
      onTouchEnd={onTouchEnd}>
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
};

export default Icon;
