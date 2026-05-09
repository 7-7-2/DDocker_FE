import dayjs from 'dayjs';

export const validateDay = (
  isCurrentMonth: number,
  data: number,
  date: Date
) => {
  return `${isCurrentMonth}-${data}` === dayjs(date).format('M-D');
};
