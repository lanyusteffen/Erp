import { FormControl } from '@angular/forms';
export class NumberIntegerValid {

    private static REGEXNUMBERINTEGER: RegExp = /^[0-9]+$/;

    public static validation(ctrl: FormControl) {

        if (ctrl.value == null || ctrl.value === '' || typeof ctrl.value === 'undefined') {
            return null;
        }

        return NumberIntegerValid.REGEXNUMBERINTEGER.test(ctrl.value) ? null : {
            valid: false,
            errMsg: '不是有效的整数格式!'
        };
    }
}
