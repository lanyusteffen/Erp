import { FormControl } from '@angular/forms';
export class EmailValid {

    private static REGEXEMAIL = new RegExp('^[\\w]+@[a-zA-Z_]+\.[a-zA-Z]{2,3}$');

    public static validation(ctrl: FormControl) {

        if (ctrl.value == null || ctrl.value === '' || typeof ctrl.value === 'undefined') {
            return null;
        }

        return EmailValid.REGEXEMAIL.test(ctrl.value) ? null : {
            result: {
                valid: false,
                errMsg: '不是有效的邮箱格式!'
            }
        };
    }
}

