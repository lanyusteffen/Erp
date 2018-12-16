import { FormControl } from '@angular/forms';
export class NumberDecimalValid {

    private static REGEXNUMBERDECIMAL: RegExp = /^[0-9]+([\.][0-9]+)?$/;

    public static validation(ctrl: FormControl) {

        if (ctrl.value == null || ctrl.value === '' || typeof ctrl.value === 'undefined') {
            return null;
        }

        const validResult = NumberDecimalValid.REGEXNUMBERDECIMAL.test(ctrl.value);

        return validResult ? null : {
            valid: false,
            errMsg: '不是有效的数字格式!'
        };
    }
}
