import { FormControl } from '@angular/forms';
export class QQValid {

    private static REGEXQQ = new RegExp('^[1-9][0-9]{4,11}$');

    public static validation(ctrl: FormControl) {

        if (ctrl.value == null || ctrl.value === '' || typeof ctrl.value === 'undefined') {
            return null;
        }

        return QQValid.REGEXQQ.test(ctrl.value) ? null : {
            valid: false,
            errMsg: '不是有效的QQ格式!'
        };
    }
}

