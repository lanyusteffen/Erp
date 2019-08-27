import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { PrimaryKeyValid } from './primary-key.valid';
import { NumberDecimalValid } from './number-decimal.valid';
export class ReceiveItemValid {

    public static validation(itemArr: FormArray) {

        
        if (itemArr.value == null || typeof itemArr.value === 'undefined') {
            return null;
        }

        const result = new Array();

        for (let i = 0; i < itemArr.length; i++) {
            const item = <FormGroup>itemArr.at(i);


            const accountIdCtrl = <FormControl>item.controls['AccountId'];
            
            const priceCtrl = <FormControl>item.controls['PayAmount'];

            if (accountIdCtrl == null || priceCtrl==null) {
                continue;
            }

            
            if(PrimaryKeyValid.validation(accountIdCtrl)!=null || parseInt(accountIdCtrl.value, 10) < 0){
                result.push({
                    valid: false,
                    propertyName: 'AccountId',
                    row: i,
                    errMsg: '请选择银行账户!'
                });
            }


           if (NumberDecimalValid.validation(priceCtrl) != null || parseInt(priceCtrl.value, 10) < 0) {
                result.push({
                    valid: false,
                    propertyName: 'PayAmount',
                    row: i,
                    errMsg: '价格必须为正数!'
                });
            }
        }

        return result;
    }
}
