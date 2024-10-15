import { monthNames } from '@consts/date.consts';

/**
 * The function `getFormattedDate` takes a Date object as input and returns a string in the format
 * "Month DayOfMonth".
 * @param {Date} date - A Date object representing a specific date.
 * @returns The function `getFormattedDate` returns a string in the format "Month DayOfMonth", where
 * Month is the name of the month corresponding to the month index of the input date, and DayOfMonth is
 * the day of the month of the input date.
 */
export function getFormattedDate(date: Date): string {
  const monthIndex = date.getMonth();
  const dayOfMonth = date.getDate();
  return `${monthNames[monthIndex]} ${dayOfMonth}`;
}
