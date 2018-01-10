import { EasyCalendarUtils } from './easy-calendar-utils';

describe('easy-calendar', () => {
  it('should exist', () => {
    expect(new EasyCalendarUtils()).toBeTruthy();
  });

  describe('static methods', () => {
    it('should return the days correctly, in the proper order', () => {
      expect(EasyCalendarUtils.daysOfWeek).toEqual(['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']);
    });

    it('should return the months correctly', () => {
      const months = [
        'January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October', 'November', 'December'
      ];
      expect(EasyCalendarUtils.monthsOfYear).toEqual(months);
    });

    it('should return the correct month array matrix', () => {
      const jan2018 = [
        [null, 1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12, 13],
        [14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27],
        [28, 29, 30, 31, null, null, null]
      ];
      const today = new Date();
      const matrix1 = EasyCalendarUtils.getCalendarDates(today.getFullYear(), today.getMonth());
      expect(matrix1).toEqual(jan2018);
    });

    it('should return the correct month array matrix for leap years', () => {
      const feb2020LeapYear = [
        [null, null, null, null, null, null, 1],
        [2, 3, 4, 5, 6, 7, 8],
        [9, 10, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 21, 22],
        [23, 24, 25, 26, 27, 28, 29]
      ];
      const febLeapYear = new Date();
      febLeapYear.setMonth(1);
      febLeapYear.setFullYear(2020);
      const matrix2 = EasyCalendarUtils.getCalendarDates(febLeapYear.getFullYear(), febLeapYear.getMonth());
      expect(matrix2).toEqual(feb2020LeapYear);
    });

    it('should return whether a given year is a leap year', () => {
      expect(EasyCalendarUtils.isLeapYear(2020)).toEqual(true);
      expect(EasyCalendarUtils.isLeapYear(2018)).toEqual(false);
      expect(EasyCalendarUtils.isLeapYear(2019)).toEqual(false);
      expect(EasyCalendarUtils.isLeapYear(2016)).toEqual(true);
    });
  });
});
