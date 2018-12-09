import { FormControl } from '@angular/forms';
export class IDCardValid {

    private static REGEXLONG = new RegExp('^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$');
    private static REGEXSHORT = new RegExp('^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$');

    public static validation(ctrl: FormControl) {

        if (ctrl.value == null || ctrl.value === '' || typeof ctrl.value === 'undefined') {
            return null;
        }

        return (IDCardValid.REGEXLONG.test(ctrl.value) || IDCardValid.REGEXSHORT.test(ctrl.value)) ? null : {
            valid: false,
            errMsg: '不是有效的身份证格式!'
        };
    }
}

