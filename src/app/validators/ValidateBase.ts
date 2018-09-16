import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';

export class ValidateBase {
   
    public static urlValidator(input: FormControl) {
        let validateString = "(https?://|WWW|www|ftp://|file://)[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[.]+[-A-Za-z0-9+&@#/%=~_|]";
        
        //set value 
        let v = input.value;

        if (v != undefined && v != "") {
            if (v.toLowerCase().match(validateString)) {
                return null;
            }
            else {
                return {
                    isUrl: true
                }
            }
        }
        return null;
    }

}