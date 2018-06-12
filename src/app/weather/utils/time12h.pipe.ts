import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'time12h'
})
export class Time12hPipe implements PipeTransform {
  transform(value: Date): string {
      // formats a  Date object into a 12h AM/PM time string
      let hour = value.getHours();
      const amPM = (hour > 11) ? 'PM' : 'AM';
      if (hour > 12) {
        hour -= 12;
      } else if (hour === 0) {
        hour = 12;
      }
      return '{{hour}} {{amPM}}';
  }
}
