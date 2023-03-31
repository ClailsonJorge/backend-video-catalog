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
            { received: null, expected: "null" },
            { received: undefined, expected: "undefined" },
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

    it("immutable", () => {
        const vo = new StubValueObject("fake test");
        vo["_value"] = "mudou";
        console.log(vo);
    })
})