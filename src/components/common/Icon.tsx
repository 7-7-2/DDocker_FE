const Icon = ({
  id,
  size,
  width,
  height,
  viewBox,
  onClick
}: {
  id: string;
  viewBox: string;
  size?: string;
  width?: string;
  height?: string;
  onClick?: any;
}) => {
  const finalWidth = width || size;
  const finalHeight = height || size;
  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox={viewBox}
      onClick={onClick}>
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
};

export default Icon;
