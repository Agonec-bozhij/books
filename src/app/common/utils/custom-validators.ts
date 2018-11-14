import {AbstractControl, FormArray, ValidationErrors, ValidatorFn} from "@angular/forms";

export class CustomValidators {
    
    public static isbn: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        let valid = false;
        const isbn: string = control.value.replace(/[^\d]+/g, "");
        
        if (isbn.length === 10) {
            let sum = 0;
            
            for (let i = 10; i > 0; i--) {
                sum += +isbn[i] * i;
            }
            
            valid = sum % 11 === 0;
        } else if (isbn.length === 13) {
            let sum = 0;
    
            for (let i = 0; i < 13; i++) {
                sum += i % 2 ? +isbn[i] : +isbn[i] * 3;
            }
    
            valid = sum % 10 === 0;
        }
        
        return valid ? null : {isbn: true};
    };
    
    public static minArrayLength = (value: number): ValidatorFn => {
        return (control: AbstractControl): ValidationErrors | null => {
            return (control as FormArray).controls.length >= value
                ? null
                : {minArrayLength: true};
        };
    }
}
