import { FormControl } from '@angular/forms';
export class IDCardValid {

    public static validation(ctrl: FormControl) {
        const REXELONG = new RegExp('^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$');
        const REXESHORT = new RegExp('^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$');

        return REXELONG.test(ctrl.value) || REXESHORT.test(ctrl.value) ? null : {
            result: {
                valid: false,
                errMsg: '不是有效的身份证格式!'
            }
        };
    }
}

