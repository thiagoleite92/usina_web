import dayjs from 'dayjs';

import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

export const parseSelectAvailabePeriods = (
  periodsAvailable: any[]
): {
  label: string;
  value: string[];
}[] => {
  const parseMonthAndYear: { label: string; value: string[] }[] =
    periodsAvailable.reduce(
      (acc: { label: string; value: string[] }[], cur) => {
        const [year, month] = cur?.date?.split('-') || ['', ''];

        const parseMonth = parseInt(month) - 1;

        acc.push({
          label: `${dayjs().month(parseMonth).format('MMMM')}/${year}`,
          value: [
            `${year}-${month}-01`,
            `${year}-${month}-${dayjs(`${year}-${month}-01`).daysInMonth()}`,
          ],
        });
        return acc;
      },
      []
    );

  parseMonthAndYear.unshift({
    label: 'Todas as Prestações',
    value: [
      parseMonthAndYear[parseMonthAndYear?.length - 1]?.value[0],
      parseMonthAndYear[0]?.value[1],
    ],
  });

  return parseMonthAndYear;
};
