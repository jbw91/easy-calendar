import { Component, Element } from '@stencil/core';
import { EasyCalendarUtils } from './easy-calendar-utils'
import 'hammerjs';

const SWIPE_RIGHT_CODE = 4;
const SWIPE_LEFT_CODE = 2;

@Component({
  tag: 'easy-calendar',
  styleUrl: 'easy-calendar.scss'
})
export class EasyCalendar {
  @Element() elRef: HTMLElement;
  days: number[][] = [];
  currentMonthAndYear: Date;

  constructor() {
    this.currentMonthAndYear = new Date();
  }

  componentDidLoad() {
    const hammer = new Hammer(this.elRef);
    hammer.on('swipe', (e) => {
      if(e.direction === SWIPE_LEFT_CODE) {
        this.nextMonth();
      }
      else if(e.direction === SWIPE_RIGHT_CODE) {
        this.previousMonth();
      }
    });
  }

  render() {
    const today = new Date();
    const currMonth = this.currentMonthAndYear;
    this.days = EasyCalendarUtils.getCalendarDates(currMonth.getFullYear(), currMonth.getMonth());

    return (
      <div>
        <div class="row month-row">
          <div class="arrow-container start"><div class="arrow left"></div></div>
          <div class="month-year-header">{EasyCalendarUtils.monthsOfYear[currMonth.getMonth()]} {currMonth.getFullYear()}</div>
          <div class="arrow-container end"><div class="arrow right"></div></div>
        </div>
        <div class="row week-row">
          {EasyCalendarUtils.daysOfWeek.map((weekDay: string) =>
            <div class="week-day">{weekDay}</div>
          )}
        </div>
        {this.days.map((week: Array<number>) =>
          <div class="row">
            {week.map((day: number) =>
              <div class={day === today.getDay() ? 'day today' : (day ? 'day hover' : 'day')}>{day}</div>
            )}
          </div>
        )}
      </div>
    );
  }

  nextMonth() {
    console.log('GO TO NEXT MONTH');
  }

  previousMonth() {
    console.log('GO TO PREVIOUS MONTH');
  }
}
