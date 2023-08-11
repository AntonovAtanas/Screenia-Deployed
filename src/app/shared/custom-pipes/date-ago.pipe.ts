import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): any {
    let target = moment(value)
    return target.fromNow()
  }
}
