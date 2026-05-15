export const monthFormmater = (activeMonth: number) => {
  const formattedMonth = String(activeMonth).padStart(2, '0');
  return formattedMonth;
};

export const convertDateFormmater = (activeMonth: number, day: number) => {
  const formattedMonth = monthFormmater(activeMonth);
  const formattedDay = String(day).padStart(2, '0');
  return `${formattedMonth}.${formattedDay}`;
};
