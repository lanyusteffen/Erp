export class ProductColorValidateComponent{

	constructor(private errorService: ErrorService) 
	{ }

	public setErrorMessage(propertyName, displayName, errors):void{
		const errorItems = new Array();
		if(errors)
		{
		}
		this.errorService.setErrorItems(errorItems);
	}

	private getValidators(){
		const validatorArrs ={
		};    
		return validatorArrs;
	  }

}
