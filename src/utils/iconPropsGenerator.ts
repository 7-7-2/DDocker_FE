export const iconPropsGenerator = (
  icon: string,
  size?: string,
  height?: string
) => {
  const ICON = {
    id: `icon-${icon}`,
    size: size || '24',
    viewBox: `0 0 ${size || '24'} ${size || '24'}`
  };

  const IMGICON = {
    id: `icon-${icon}`,
    width: size,
    height: height,
    viewBox: `0 0 ${size} ${height}`
  };

  return height ? IMGICON : ICON;
};
