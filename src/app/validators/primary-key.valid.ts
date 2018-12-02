import { FormControl } from '@angular/forms';
export class PrimaryKeyValid {

    private static REGEXID = new RegExp('^\d+$');

    public static validation(ctrl: FormControl) {

        if (ctrl.value == null || ctrl.value === '' || typeof ctrl.value === 'undefined') {
            return null;
        }

        return PrimaryKeyValid.REGEXID.test(ctrl.value) && parseInt(ctrl.value, 10) > 0 ? null : {
            result: {
                valid: false
            }
        };
    }
}
