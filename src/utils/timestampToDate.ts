import dayjs, { Dayjs } from 'dayjs';
import duration, { Duration } from 'dayjs/plugin/duration';
dayjs.extend(duration);

const getTimeDiff = (timeToCompare: Dayjs): string => {
  const timeDiffDuration: Duration = dayjs.duration(
    dayjs().diff(timeToCompare)
  );
  const getDiff = (unit: string) => parseInt(timeDiffDuration.format(unit));
  const units = ['Y', 'M', 'D', 'H', 'm', 's'];
  const diffMap = new Map();
  units.forEach(u => diffMap.set(u, getDiff(u)));
  const targetUnit = units.find(u => diffMap.get(u) > 0) || '';
  const convertUnit = (unit: string, diff: number) => {
    const unitMap: Record<string, string> = {
      Y: '년 전',
      M: '달 전',
      D: '일 전',
      H: '시간 전',
      m: '분 전',
      s: '초 전'
    };
    const before = unitMap[unit];
    return `${diff}${before}`;
  };
  return convertUnit(targetUnit, diffMap.get(targetUnit));
};

export default getTimeDiff;
