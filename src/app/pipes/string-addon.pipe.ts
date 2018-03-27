import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringAddon',
  pure: true
})

export class StringAddonPipe implements PipeTransform {
  transform(value: any, addon: string): string {
    return value ? `${value}${addon}` : '';
  }
}
