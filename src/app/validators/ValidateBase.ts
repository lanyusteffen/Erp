import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';

export class ValidateBase {

    public static urlValidator(input: FormControl) {
        const validateString = '(https?://|WWW|www|ftp://|file://)[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[.]+[-A-Za-z0-9+&@#/%=~_|]';

        const v = input.value;

        if (v !== undefined && v !== '') {
            if (v.toLowerCase().match(validateString)) {
                return null;
            } else {
                return {
                    isUrl: true,
                };
            }
        }
        return null;
    }

}