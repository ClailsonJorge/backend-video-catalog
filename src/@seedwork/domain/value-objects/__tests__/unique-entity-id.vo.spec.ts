import { InvalidUuidError } from "../../../errors/invalid-uuid.error";
import { UniqueEntityId } from "../unique-entity-id.vo"
import { validate as uuidValidate } from "uuid";

// function spyValidateMethod () {
//     return jest.spyOn(UniqueEntityId.prototype as any, "validate");
// }

describe("UniqueEntityId Unit Tests", () => {
    // beforeEach(() => {
    //     jest.clearAllMocks();
    // });

    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
    
    // beforeEach(() => {
    //     validateSpy.mockClear();
    // });

    it("should throw error whem uuid is invalid", () => {
        // const validateSpy = spyValidateMethod();
        expect(() => new UniqueEntityId("Fake_id")).toThrow(new InvalidUuidError());
        expect(validateSpy).toHaveBeenCalled();
    });

    it("should accept a uuid passed in constructor", () => {
        // const validateSpy = spyValidateMethod();
        const uuid = "9b71a6a6-4c15-4f90-b5e0-c2b2efa36f4e";
        const vo = new UniqueEntityId(uuid);

        expect(vo.value).toBe(uuid);
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    it("should accept a uuid passed in constructor", () => {
        // const validateSpy = spyValidateMethod();
        const vo = new UniqueEntityId();

        expect(uuidValidate(vo.value)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalledTimes(1);
    })
})