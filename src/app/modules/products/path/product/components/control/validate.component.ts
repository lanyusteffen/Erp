export class ProductValidateComponent{

	constructor(private errorService: ErrorService) 
	{ }

	public setErrorMessage(propertyName, displayName, errors):void{
		const errorItems = new Array();
		if(errors)
		{
								
									if(errors.maxlength){
										const errorItem = {
										  AttemptedValue: '',
										  ErrorCode:'NotEmptyValidator',
										  ErrorDescription:null,
										  ErrorMessage: displayName + '长度不能超过 200',
										  ErrorStackTrace:null,
										  PropertyName:propertyName
										};
										errorItems.push(errorItem);
									}
								   if(errors.required){
										const errorItem = {
										  AttemptedValue: '',
										  ErrorCode:'NotEmptyValidator',
										  ErrorDescription:null,
										  ErrorMessage:  displayName + '必填',
										  ErrorStackTrace:null,
										  PropertyName:propertyName
										};
										errorItems.push(errorItem);
								   }
								
		}
		this.errorService.setErrorItems(errorItems);
	}

	private getValidators(){
		const validatorArrs ={
Name:[
											Validators.maxLength(200),
											Validators.required
										  ]
		};    
		return validatorArrs;
	  }

}
