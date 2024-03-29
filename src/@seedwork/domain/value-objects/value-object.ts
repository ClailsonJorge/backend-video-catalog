import { deepFreeze } from "../utils/objects";

export default abstract class ValueObject<Value = any> {
    protected _value: Value;

    constructor(value: Value) {
        this._value = deepFreeze(value);
    }
    
    get value(): Value {
        return this._value;
    }

    toString = () => {
        if(typeof this.value !== "object" || this.value === null) {
            try {
                return this.value.toString();
            } catch (e) {
                return this.value + "";
            }
        }
        const valueStr = this.value.toString();
        return valueStr === "[object Object]" ? JSON.stringify(this.value) : valueStr;
    }
}