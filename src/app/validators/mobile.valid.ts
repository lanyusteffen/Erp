import { FormControl } from '@angular/forms';
export class MobileValid {

    private static REGEXTEL = new RegExp('^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$');
    private static REGEXMOBILE = new RegExp('^(\\+\\d{2}-)?0\\d{2,3}-\\d{7,8}$');

    public static validation(ctrl: FormControl) {

        if (ctrl.value == null || ctrl.value === '' || typeof ctrl.value === 'undefined') {
            return null;
        }

        return (MobileValid.REGEXTEL.test(ctrl.value) || MobileValid.REGEXMOBILE.test(ctrl.value)) ? null : {
            result: {
                valid: false,
                errMsg: '不是有效的电话格式!'
            }
        };
    }
}

