import ValueObject from "../value-object";

class StubValueObject extends ValueObject {

}

describe("ValueObject Unit Test", () => {
    it("should set value", () => {
        let vo = new StubValueObject("string value");
        expect(vo.value).toBe("string value");

        vo = new StubValueObject("Value 1");
        expect(vo.value).toStrictEqual("Value 1");
    })

    it("should convert to a string", () => {
        const date = new Date();
        let arrange = [
            { received: "", expected: "" },
            { received: "fake teste", expected: "fake teste" },
            { received: 0, expected: "0" },
            { received: 1, expected: "1" },
            { received: 5, expected: "5" },
            { received: true, expected: "true" },
            { received: false, expected: "false" },
            { received: date, expected: date.toString() },
            { received: { prop1: "value1" }, expected: JSON.stringify({ prop1: "value1" }) },
        ];

        arrange.forEach(value => {
            let vo = new StubValueObject(value.received);
    
            expect(vo+"").toBe(value.expected);
        });
    })

    it("should be a immutable object", () => {
        let obj = { prop1: "value1", deep: { prop2: "value2", prop3: new Date() } };
        const vo = new StubValueObject(obj);

        expect(() => { (vo as any).value.prop1 = "change_value" }).toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'");
        expect(() => { (vo as any).value.deep.prop2 = "change_value" }).toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'");
        expect(vo.value.deep.prop3).toBeInstanceOf(Date)
    })
})