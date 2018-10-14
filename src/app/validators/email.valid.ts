import { FormControl } from '@angular/forms';
export class EmailValid {

    public static validation(ctrl: FormControl) {
        const REXEMAIL = new RegExp('[\\w]+@[a-zA-Z_]+\.[a-zA-Z]{2,3}$');
        return REXEMAIL.test(ctrl.value) ? null : {
            result: {
                valid: false,
                errMsg: '不是有效的邮箱格式!'
            }
        };
    }
}

