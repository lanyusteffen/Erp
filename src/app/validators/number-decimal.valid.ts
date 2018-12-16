import { FormControl } from '@angular/forms';
export class NumberDecimalValid {

    private static REGEXNUMBERDECIMAL = /[0-9]+([\.]?[0-9]+)?/g;

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
