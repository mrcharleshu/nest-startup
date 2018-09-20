import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint()
export class IsStringDate implements ValidatorConstraintInterface {

  validate(text: string, validationArguments: ValidationArguments) {
    return text && text.length === 10 && !isNaN(Date.parse(text));
  }

  defaultMessage(validationArguments?: ValidationArguments) {
    return '日期格式[yyyy-MM-dd]错误';
  }
}
