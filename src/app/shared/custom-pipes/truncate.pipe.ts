import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(text: string, length: number = 20): string {

    if (text.length > length) {
      let truncated: string = text.substring(0, length).trim() + '...';
      return truncated;
    }

    return text;
  }
}