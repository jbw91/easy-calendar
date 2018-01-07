const DAYS_PER_WEEK = 7;

export class EasyCalendarUtils {
  constructor() { }

  public static daysOfWeek = [
    'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'
  ];
  public static monthsOfYear = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  public static getCalendarDates(year: number, month: number): number[][] {
    const calendarMatrix = [];

    const date = new Date(year, month, 1);

    const startDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // Get starting day of week and ending day of week
    const startDow = startDay.getDay();
    const endDow = lastDay.getDay();

    // If the month didn't start on a Sunday, start from the last Sunday of the previous month
    startDay.setDate(startDay.getDate() - startDow);

    // If the month didn't end on a Saturday, end on the following Saturday in the next month
    lastDay.setDate(lastDay.getDate() + (6 - endDow));

    let week = []
    while (startDay <= lastDay) {
      let date = new Date(startDay).getDate();
      // Make sure to use nulls instead of dates before current month
      if(calendarMatrix.length < 1 && date > DAYS_PER_WEEK) {
        date = null;
      }
      // Make sure to use nulls instead of dates after current month
      else if(calendarMatrix.length > 3 && date <= DAYS_PER_WEEK) {
        date = null;
      }
      week.push(date);
      if (week.length === 7) {
        calendarMatrix.push(week);
        week = [];
      }
      startDay.setDate(startDay.getDate() + 1);
    }

    return calendarMatrix;
  }

  public static isLeapYear(year: number): boolean {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
  }
}
