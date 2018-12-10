import { FormControl } from '@angular/forms';
export class NumberDecimalValid {

    private static REGEXNUMBERDECIMAL = new RegExp('^[0-9]+(\\.|0-9]+)?$');

    public static validation(ctrl: FormControl) {

        if (ctrl.value == null || ctrl.value === '' || typeof ctrl.value === 'undefined') {
            return null;
        }

        return NumberDecimalValid.REGEXNUMBERDECIMAL.test(ctrl.value) ? null : {
            valid: false,
            errMsg: '不是有效的数字格式!'
        };
    }
}
