import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { PrimaryKeyValid } from './primary-key.valid';
import { NumberDecimalValid } from './number-decimal.valid';
export class SaleItemValid {

    public static validation(itemArr: FormArray) {

        if (itemArr.value == null || typeof itemArr.value === 'undefined') {
            return null;
        }

        const result = new Array();

        for (let i = 0; i < itemArr.length; i++) {
            const item = <FormGroup>itemArr.at(i);
            const goodsIdCtrl = <FormControl>item.controls['GoodsId'];
            const quanlityCtrl = <FormControl>item.controls['Quanlity'];
            const priceCtrl = <FormControl>item.controls['Price'];
            if (PrimaryKeyValid.validation(goodsIdCtrl) != null) {
                continue;
            }

            if (NumberDecimalValid.validation(quanlityCtrl) != null || parseInt(quanlityCtrl.value, 10) < 0) {
                result.push({
                    valid: false,
                    propertyName: 'Quanlity',
                    row: i,
                    errMsg: '数量必须为正数!'
                });
            } else if (NumberDecimalValid.validation(priceCtrl) != null || parseInt(priceCtrl.value, 10) < 0) {
                result.push({
                    valid: false,
                    propertyName: 'Price',
                    row: i,
                    errMsg: '价格必须为正数!'
                });
            }
        }

        return result;
    }
}
