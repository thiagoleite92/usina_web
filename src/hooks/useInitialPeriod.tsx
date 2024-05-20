import dayjs from 'dayjs';

export const useInitialPeriod = () => {
  return [
    dayjs().startOf('month').subtract(1, 'month').format('YYYY-MM-DD'),
    dayjs().endOf('month').subtract(1, 'month').format('YYYY-MM-DD'),
  ];
};
