import { FormControl } from '@angular/forms';
export class MobileValid {

    public static validation(ctrl: FormControl) {
        const REXETEL = new RegExp('^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$');
        const REXEMOBIL = new RegExp('^(\\+\\d{2}-)?0\\d{2,3}-\\d{7,8}$');
        return REXETEL.test(ctrl.value) || REXEMOBIL.test(ctrl.value) ? null : {
            result: {
                valid: false,
                errMsg: '不是有效的电话格式!'
            }
        };
    }
}

