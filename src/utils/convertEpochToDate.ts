export const convertEpochToDate = (date: number) => {
  const WeekDays = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];

  const currentDate = new Date();
  const inputDate = new Date(date * 1000);

  const inputDay = WeekDays[inputDate.getDay()];

  if (currentDate.toDateString() === inputDate.toDateString()) {
    return 'Today';
  }

  return inputDay;
};
