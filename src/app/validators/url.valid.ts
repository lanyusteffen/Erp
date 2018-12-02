import { FormControl } from '@angular/forms';
export class UrlValid {

    private static REGEXURL = new RegExp('^(https?://|WWW|www|ftp://|file://)[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[.]+[-A-Za-z0-9+&@#/%=~_|]$');

    public static validation(ctrl: FormControl) {

        if (ctrl.value == null || ctrl.value === '' || typeof ctrl.value === 'undefined') {
            return null;
        }

        return UrlValid.REGEXURL.test(ctrl.value) ? null : {
            result: {
                valid: false,
                errMsg: '不是有效的URL格式!'
            }
        };
    }
}
