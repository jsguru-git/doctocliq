import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions} from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  subWeeks,
  addWeeks,
  subDays,
  addDays,
  endOfMonth,
  startOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  subMonths,
  addMonths,
} from 'date-fns';

import {
  CalendarEvent,
  CalendarEventTimesChangedEvent  
} from 'angular-calendar';

type CalendarPeriod = 'day' | 'week' | 'month';

function addPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: addDays,
    week: addWeeks,
    month: addMonths
  }[period](date, amount);
}

function subPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: subDays,
    week: subWeeks,
    month: subMonths
  }[period](date, amount);
}

function startOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: startOfDay,
    week: startOfWeek,
    month: startOfMonth
  }[period](date);
}

function endOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: endOfDay,
    week: endOfWeek,
    month: endOfMonth
  }[period](date);
}

@IonicPage()
@Component({
  selector: 'page-tabclinic1',
  templateUrl: 'tabclinic1.html'
})

export class Tabclinic1Page {

  checked: boolean = true;
  switch_string: String = "AAA";
  startdayOfWeek: Date = addDays(startOfWeek(new Date()), 1);
  _startdayOfWeek: String = this.startdayOfWeek.toDateString().substring(4, 10);
  enddayOfWeek: Date = addDays(startOfWeek(new Date()), 6);
  _enddayOfWeek: String = this.enddayOfWeek.toDateString().substring(4, 10);
  viewDate: Date = new Date();
  view: CalendarPeriod = 'week';

  // view = 'day';
  locale: string = 'en';
  isDragging = false;
  refresh: Subject<any> = new Subject();

  minDate: Date = subMonths(new Date(), 1);

  maxDate: Date = addMonths(new Date(), 1);

  prevBtnDisabled: boolean = false;

  nextBtnDisabled: boolean = false;
  
  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {
  }

  excludeDays: number[] = [0];

  events: CalendarEvent[] = [
    {
      start: addHours(startOfDay(new Date()), 10),
      end: addHours(startOfDay(new Date()), 11),
      title: 'First Event',
      cssClass: 'custom-event',
      color: {
        primary: '#488aff',
        secondary: '#bbd0f5'
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: addHours(startOfDay(new Date()), 14),
      end: addHours(startOfDay(new Date()), 16),
      title: 'Second Event',
      cssClass: 'custom-event',
      color: {
        primary: '#488aff',
        secondary: '#bbd0f5'
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  handleEvent(event: CalendarEvent): void {
    let alert = this.alertCtrl.create({
      title: event.title,
      message: event.start + ' to ' + event.end,
      buttons: ['OK']
    });
    alert.present();
  }
 
  eventTimesChanged({event, newStart, newEnd} : CalendarEventTimesChangedEvent): void {
    if (this.isDragging) {
      return;
    }
    this.isDragging = true;
 
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
 
    setTimeout(() => {
      this.isDragging = false;
    },1000);
  }
 
  hourSegmentClicked(event): void {
    let newEvent: CalendarEvent = {
      start: event.date,
      end: addHours(event.date, 1),
      title: 'TEST EVENT',
      cssClass: 'custom-event',
      color: {
        primary: '#488aff',
        secondary: '#bbd0f5'
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
 
    this.events.push(newEvent);
    this.refresh.next();
  }  

  increment(): void {
    this.startdayOfWeek = addDays(startOfWeek(this.viewDate), 1);
    this._startdayOfWeek = this.startdayOfWeek.toDateString().substring(4, 10);
    this.enddayOfWeek = endOfWeek(this.viewDate);
    this._enddayOfWeek = this.enddayOfWeek.toDateString().substring(4, 10);
     console.log(this.startdayOfWeek);
    // let tmp_date: Date = addPeriod(this.view, this.viewDate, 1); 
    // this.changeDate(tmp_date);
    // this.startdayOfWeek = startOfWeek(tmp_date);
    // this.enddayOfWeek = endOfWeek(tmp_date);
    // console.log(startOfWeek(this.startdayOfWeek));
  }

  decrement(): void {
    this.startdayOfWeek = addDays(startOfWeek(this.viewDate), 1);
    this._startdayOfWeek = this.startdayOfWeek.toDateString().substring(4, 10);
    this.enddayOfWeek = endOfWeek(this.viewDate);
    this._enddayOfWeek = this.enddayOfWeek.toDateString().substring(4, 10);
    // let tmp_date: Date = subPeriod(this.view, this.viewDate, 1);
    // this.changeDate(tmp_date);
    // this.startdayOfWeek = startOfWeek(tmp_date);
    // this.enddayOfWeek = endOfWeek(tmp_date);
  }

  today(): void {
    this.changeDate(new Date());
  }

  dateIsValid(date: Date): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }

  changeDate(date: Date): void {
    this.viewDate = date;
  }

  changeView(view: CalendarPeriod): void {
    this.view = view;
  }

}

