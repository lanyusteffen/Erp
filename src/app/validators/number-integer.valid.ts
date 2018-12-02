import { FormControl } from '@angular/forms';
export class NumberIntegerValid {

    private static REGEXNUMBERINTEGER = new RegExp('^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$');

    public static validation(ctrl: FormControl) {

        if (ctrl.value == null || ctrl.value === '' || typeof ctrl.value === 'undefined') {
            return null;
        }

        return NumberIntegerValid.REGEXNUMBERINTEGER.test(ctrl.value) ? null : {
            result: {
                valid: false,
                errMsg: '不是有效的整数格式!'
            }
        };
    }
}
