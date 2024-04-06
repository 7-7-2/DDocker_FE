import dayjs from 'dayjs';

export const validateDay = (data: string, date: Date) => {
  return data === dayjs(date).format('MM-DD');
};
