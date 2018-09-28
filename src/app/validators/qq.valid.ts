import { FormControl } from '@angular/forms';
export class QQValid {

    public static validation(ctrl: FormControl) {
        const REXEQQ = new RegExp('^[1-9][0-9]{4,11}$');

        return REXEQQ.test(ctrl.value) ? null : {
            result: {
                valid: false,
                errMsg: '不是有效的QQ格式!'
            }
        };
    }
}

