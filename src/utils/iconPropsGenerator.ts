export const iconPropsGenerator = (icon: string, size?: string) => {
  const ICON = {
    id: `icon-${icon}`,
    size: size || '24'
  };
  return ICON;
};
