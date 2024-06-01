const Icon = ({
  id,
  size,
  onClick
}: {
  id: string;
  size: string;
  onClick?: any;
}) => {
  return (
    <svg
      width={size}
      height={size}
      onClick={onClick}>
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
};

export default Icon;
