import { ValidationError } from "../../@seedwork/errors/validation-errors";
import { ValidatorRules } from "./validator-rules"

type AssertProps = {
    value: any;
    property: string;
    method: keyof ValidatorRules;
    argsMethod?: number;
    errorMessage?: string;

}

const assertIsValidFunc = ({value, property = "", method,  argsMethod}: AssertProps) => {
    const validatorReturned = ValidatorRules.values(value, property);
    expect(() => validatorReturned[method](argsMethod)).not.toThrow()
}

const assertIsNotValidFunc = ({ value, property = "", method,  argsMethod, errorMessage }: AssertProps) => {
    const validatorReturned = ValidatorRules.values(value, property);
    expect(() => validatorReturned[method](argsMethod)).toThrow(new ValidationError(errorMessage))
}

describe("Validator Rules", () => {
    it("should test value method", () => {
        const validatorClass = ValidatorRules.values("some value", "field");

        expect(validatorClass).toBeInstanceOf(ValidatorRules);
        expect(validatorClass["value"]).toBe("some value");
        expect(validatorClass["property"]).toBe("field");
    });

    it("should test required method", () => {
        const nameField = "field-name";
        const errorMessage = `The ${nameField} field is required.`;
        let arrange = [
            { value: "" },
            { value: null },
            { value: undefined },
        ];
        
        arrange.forEach(
            test => assertIsNotValidFunc({ 
                value: test.value, 
                property: nameField, 
                method: "required", 
                errorMessage 
            }));
            
        const validatorClass = ValidatorRules.values("some_name", nameField).required();
        expect(validatorClass).toBeInstanceOf(ValidatorRules);
    });
    
    it("should test string method", () => {
        const nameField = "field-name";
        const errorMessage = `The ${nameField} must be a string.`;
        let arrange = [
            { value: 1 },
            { value: [1] },
            { value: {} },
            { value: null },
            { value: undefined },
        ];
        
        arrange.forEach(
            test => assertIsNotValidFunc({ 
                value: test.value, 
                property: nameField, 
                method: "string", 
                errorMessage 
            }));
            
        const validatorClass = ValidatorRules.values("some_string", nameField).string();
        expect(validatorClass).toBeInstanceOf(ValidatorRules);
    });

    it("should test maxLength method", () => {
        const nameField = "field-name";
        const errorMessage = (length: number) => `The ${nameField} must be less or equal than ${length}`;
        const arrange = [
            { value: "length more than 3", error: errorMessage(3), arg: 3 },
            { value: [1,2,3,4], arg: 3, error: errorMessage(3)},
        ];
        
        arrange.forEach(
            test => assertIsNotValidFunc({ 
                value: test.value, 
                property: nameField, 
                method: "maxLength", 
                errorMessage: test.error,
                argsMethod: test.arg
            }));

        const arrange2 = [
            { value: "length less than 30", error: errorMessage(30), arg: 30 },
            { value: [1,2,3,4], arg: 5, error: errorMessage(5)},
            { value: "length equal 15", arg: 15, error: errorMessage(15)},
            { value: null, arg: 15, error: errorMessage(15)},
            { value: undefined, arg: 15, error: errorMessage(15)},
            { value: {}, arg: 15, error: errorMessage(15)},
            { value: "", arg: 0, error: errorMessage(0)},
        ];
        
        arrange2.forEach(
            test => assertIsValidFunc({ 
                value: test.value, 
                property: nameField, 
                method: "maxLength", 
                errorMessage: test.error,
                argsMethod: test.arg
            }));
    });

})