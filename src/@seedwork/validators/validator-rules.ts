import { ValidationError } from "../../@seedwork/errors/validation-errors";

export class ValidatorRules {
    private constructor(private value: any, private property: string) {}

    static values(value: any, property: string): ValidatorRules {
        return new ValidatorRules(value, property);
    }

    required(): this {
        if(this.value === null || this.value === undefined || this.value === "") {
            throw new ValidationError(`The ${this.property} field is required.`);
        }                            
        return this;
    }

    string(): this {
        if(typeof this.value !== "string") {
            throw new ValidationError(`The ${this.property} must be a string.`)
        }
        return this;
    }

    maxLength(length: number): this {
        if(this.value?.length > length){
            throw new ValidationError(`The ${this.property} must be less or equal than ${length}`)
        }
        return this;
    }
}
