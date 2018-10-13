import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';

/*
  Generated class for the CustomEventTitleFormatterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CustomEventTitleFormatterProvider extends CalendarEventTitleFormatter {
 
  dayTooltip(event: CalendarEvent): string {
    return;
  }
  // constructor(public http: HttpClient) {
  //   console.log('Hello CustomEventTitleFormatterProvider Provider');
  // }
}