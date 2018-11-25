import { FormControl } from '@angular/forms';
export class ParmaryKeyValid {

    public static validation(ctrl: FormControl) {
        const REXNUMBER = new RegExp('^\d+$');

        return REXNUMBER.test(ctrl.value) && parseInt(ctrl.value, 10) > 0 ? null : {
            result: {
                valid: false,
                errMsg: '请选择!'
            }
        };
    }
}
