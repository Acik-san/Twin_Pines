import {
  endOfDay,
  format,
  isSameDay,
  isWithinInterval,
  parseISO,
  startOfDay,
  subDays,
} from 'date-fns';

export const getInitials = (arr: string[]): string => {
  return (
    arr
      .toString()
      .split(',')
      .map(string => string.slice(0, 1))
      .join('') || 'U'
  );
};

export const stringToColour = (string: string): string => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    colour += ('00' + value.toString(16)).slice(-2);
  }
  return colour;
};

export const calculateDate = (
  createdAt: string,
  format1: string,
  format2: string,
  format3: string
): string => {
  const date = parseISO(createdAt);
  const currentDate = new Date();
  return isSameDay(date, currentDate)
    ? format(date, format1)
    : !isSameDay(date, currentDate) &&
      isWithinInterval(date, {
        start: startOfDay(subDays(currentDate, 6)),
        end: endOfDay(currentDate),
      })
    ? format(date, format2)
    : format(date, format3);
};
