export const customOptionFormmater = (customOption: Array<string | number>) => {
  const shotText = `+${customOption[customOption.length - 1]}샷`;
  const customOptions = `${customOption[0]}, ${customOption[1]}, ${shotText}`;
  return customOptions;
};
