import Category from "./category"

describe("Testing unit category class", () => {
    it("should be test class constructor", () => {
        const createdAt = new Date();
        const movie = new Category({ name: "some_name", description: "some_description", isActive: true, createdAt });

        expect(movie.props).toStrictEqual({ name: "some_name", description: "some_description", isActive: true, createdAt });

        // expect(movie.props.name).toBe("some_name");
        // expect(movie.props.description).toBe("some_description");
        // expect(movie.props.isActive).toBeTruthy();
        // expect(movie.props.createdAt).toEqual(createdAt);
    })
})