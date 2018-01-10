import { flush, render } from '@stencil/core/testing';
import { EasyCalendar } from './easy-calendar';
import { EasyCalendarUtils } from './easy-calendar-utils';

describe('easy-calendar', () => {
  it('should build', () => {
    expect(new EasyCalendar()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    const today = new Date();
    beforeEach(async () => {
      element = await render({
        components: [EasyCalendar],
        html: '<easy-calendar></easy-calendar>'
      });
    });

    it('should display the correct header when using no parameters', () => {
      const header = element.querySelector('.month-year-header');
      const month = EasyCalendarUtils.monthsOfYear[today.getMonth()];
      expect(header.textContent.trim()).toEqual(`${month} ${today.getFullYear()}`);
    });

    it('should correctly navigate to the previous month', async () => {
      const header = element.querySelector('.month-year-header');
      const backButton = element.querySelector('.start');
      const lastMonth = new Date();
      let newMonth = today.getMonth() - 1;
      if(newMonth < 0) {
        newMonth += 12;
        lastMonth.setFullYear(lastMonth.getFullYear() - 1);
      }
      lastMonth.setMonth(newMonth);
      const month = EasyCalendarUtils.monthsOfYear[lastMonth.getMonth()];
      backButton.click();
      await flush(element);
      expect(header.textContent.trim()).toEqual(`${month} ${lastMonth.getFullYear()}`);
    });

    it('should correctly navigate to the next month', async () => {
      const header = element.querySelector('.month-year-header');
      const forwardButton = element.querySelector('.end');
      const nextMonth = new Date();
      let newMonth = today.getMonth() + 1;
      if(newMonth > 11) {
        newMonth -= 12;
        nextMonth.setFullYear(nextMonth.getFullYear() + 1);
      }
      nextMonth.setMonth(newMonth);
      const month = EasyCalendarUtils.monthsOfYear[nextMonth.getMonth()];
      forwardButton.click();
      await flush(element);
      expect(header.textContent.trim()).toEqual(`${month} ${nextMonth.getFullYear()}`);
    });
  });
});
