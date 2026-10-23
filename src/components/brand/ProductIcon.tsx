const ProductIcon = ({
  type,
  size = '170'
}: {
  type: string;
  size?: string;
}) => {
  return (
    <div>
      <img
        src={`/svg/productIcons/${type}.svg`}
        width={size}
        height={size}
      />
    </div>
  );
};

export default ProductIcon;
