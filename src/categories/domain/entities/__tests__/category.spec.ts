import Category, { CategoryProps } from "../category"
import { omit } from 'lodash';
import { validate as uuidValidate } from 'uuid';

describe("Testing unit category class", () => {
     
    it("should be test class constructor", () => {
        let category = new Category({ 
            name: "some_name",
        });
        let props = omit(category.props, 'created_at');        
        expect(props).toStrictEqual({ 
            name: "some_name", 
            description: null, 
            isActive: true,
        });
        expect(category.created_at).toBeInstanceOf(Date);

        let created_at = new Date();
        category = new Category({
            name: 'some_name', 
            description: "some_description", 
            isActive: false,
            created_at,
        });       
        expect(category.props).toStrictEqual({
            name: "some_name",
            description: "some_description",
            isActive: false,
            created_at
        });

        category = new Category({
            name: "some_name",
            description: "some_description",

        });
        expect(category).toMatchObject({
            name: "some_name",
            description: "some_description"
        });

        category = new Category({
            name: "some_name",
            isActive: true,

        });
        expect(category).toMatchObject({
            name: "some_name",
            isActive: true,
        });

        created_at = new Date();
        category = new Category({
            name: "some_name",
            created_at,

        });
        expect(category).toMatchObject({
            name: "some_name",
            created_at,
        });

        // expect(movie.props.name).toBe("some_name");
        // expect(movie.props.description).toBe("some_description");
        // expect(movie.props.isActive).toBeTruthy();
        // expect(movie.props.createdAt).toEqual(createdAt);
    });

    it("should test uuid", () => {
        type CategoryData = { props: CategoryProps; id?: string; };

        const data: CategoryData[] = [
            { props: { name: "some_name" }},
            { props: { name: "some_name" }, id: null },
            { props: { name: "some_name" }, id: undefined },
            { props: { name: "some_name" }, id: "34404b03-fdf0-45c9-b3e4-72b3f41c64c4" },
        ]

        data.forEach(prop => {
            let category = new Category(prop.props, prop.id);
            expect(category.id).not.toBeNull();
            expect(uuidValidate(category.id)).toBeTruthy();
        })
    })

    it("should getter of name field", () => {
        const category = new Category({ 
            name: "some_name",            
        });
        expect(category.name).toBe("some_name");
    })

    it("should getter and setter of description field", () => {
        let category = new Category({ 
            name: "some_name",        
        });
        expect(category.description).toBeNull();

        category = new Category({ 
            name: "some_name",
            description: "some_description"            
        });
        expect(category.description).toBe("some_description");

        category = new Category({ 
            name: "some_name",
            description: "some_description"            
        });

        category["description"] = "other_description";
        expect(category.description).toBe("other_description");

        category["description"] = undefined;
        expect(category.description).toBeNull();

        category["description"] = null;
        expect(category.description).toBeNull();
    })

    it("should getter of isActive field", () => {
        let category = new Category({ 
            name: "some_name",            
        });
        expect(category.isActive).toBeTruthy();

        category = new Category({ 
            name: "some_name",     
            isActive: true,       
        });
        expect(category.isActive).toBeTruthy();

        category = new Category({ 
            name: "some_name",     
            isActive: false,       
        });
        expect(category.isActive).toBeFalsy();
    });

    it("should getter of created_at field", () => {
        let category = new Category({ 
            name: "some_name",            
        });
        expect(category.created_at).toBeInstanceOf(Date);

        let created_at = new Date();
        category = new Category({ 
            name: "some_name",    
            created_at,        
        });
        expect(category.created_at).toBe(created_at);
    })
})