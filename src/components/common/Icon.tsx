const Icon = ({ id, ...props }: { id: string }) => {
  return (
    <svg {...props}>
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
};

export default Icon;
