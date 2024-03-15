const Icon = ({
  id,
  size,
  onTouchEnd,
  onClick
}: {
  id: string;
  size: string;
  onTouchEnd?: any;
  onClick?: any;
}) => {
  return (
    <svg
      width={size}
      height={size}
      onTouchEnd={onTouchEnd}
      onClick={onClick}>
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
};

export default Icon;
