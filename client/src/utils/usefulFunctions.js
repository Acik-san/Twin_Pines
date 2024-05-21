import {
  endOfDay,
  format,
  isSameDay,
  isWithinInterval,
  parseISO,
  startOfDay,
  subDays,
} from 'date-fns';

export const getInitials = arr => {
  return (
    arr
      .toString()
      .split(',')
      .map(string => string.slice(0, 1))
      .join('') || 'U'
  );
};

export const stringToColour = string => {
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

export const dateToString = task => {
  return task.deadLine.slice(0, 10).concat(' ', task.deadLine.slice(11, 19));
};

export const calculateDate = (createdAt, format1, format2, format3) => {
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
