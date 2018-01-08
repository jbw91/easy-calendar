import { Component, Element, State } from '@stencil/core';
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
  @State() currentDate: Date;
  days: number[][] = [];
  today: Date;

  constructor() {
    this.currentDate = new Date();
    this.today = new Date();
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
    this.days = EasyCalendarUtils.getCalendarDates(this.currentDate.getFullYear(), this.currentDate.getMonth());

    return (
      <div>
        <div class="row month-row">
          <div class="arrow-container start" onClick={() => this.previousMonth()}><div class="arrow left"></div></div>
          <div class="month-year-header">{EasyCalendarUtils.monthsOfYear[this.currentDate.getMonth()]} {this.currentDate.getFullYear()}</div>
          <div class="arrow-container end" onClick={() => this.nextMonth()}><div class="arrow right"></div></div>
        </div>
        <div class="row week-row">
          {EasyCalendarUtils.daysOfWeek.map((weekDay: string) =>
            <div class="week-day">{weekDay}</div>
          )}
        </div>
        {this.days.map((week: Array<number>) =>
          <div class="row">
            {week.map((day: number) =>
              <div class={day === this.today.getDate() && this.currentDate.getFullYear() === this.today.getFullYear() && this.currentDate.getMonth() === this.today.getMonth() ? 'day today' : (day ? 'day hover' : 'day')}>
                {day}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  nextMonth() {
    let newDate = this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.currentDate = new Date(newDate);
  }

  previousMonth() {
    let newDate = this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.currentDate = new Date(newDate);
  }
}
