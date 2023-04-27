import Category, { CategoryProps } from "../category"
import { omit } from 'lodash';
import { UniqueEntityId } from "../../../../@seedwork/domain/value-objects/unique-entity-id.vo";

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
        type CategoryData = { props: CategoryProps; id?: UniqueEntityId; };

        const data: CategoryData[] = [
            { props: { name: "some_name" }},
            { props: { name: "some_name" }, id: null },
            { props: { name: "some_name" }, id: undefined },
            { props: { name: "some_name" }, id: new UniqueEntityId() },
        ]

        data.forEach(prop => {
            let category = new Category(prop.props, prop.id);
            expect(category.uniqueEntityId.value).not.toBeNull();
            expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
        })
    })

    it("should getter and setter of name field", () => {
        const category = new Category({ 
            name: "some_name",            
        });
        expect(category.name).toBe("some_name");

        category["name"] = "other_name";
        expect(category.name).toBe("other_name");

        category["name"] = undefined;
        expect(category.name).toBeNull();

        category["name"] = null;
        expect(category.name).toBeNull();
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

    it("should getter and setter of isActive field", () => {
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

        category["isActive"] = true;
        expect(category.isActive).toBeTruthy();

        category["isActive"] = false;
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

    it("should update name and description", () => {
        const category = new Category({ 
            name: "some_name",
            description: "some_description"            
        });

        (category as any).update();
        expect(category.name).toBe("some_name");
        expect(category.description).toBe("some_description");

        category.update({ name: "other_name" });
        expect(category.name).toBe("other_name");
        expect(category.description).toBe("some_description");

        category.update({ description: "other_description" });
        expect(category.name).toBe("other_name");
        expect(category.description).toBe("other_description");

        category.update({ name: "other_name_2", description: "other_description_2" });
        expect(category.name).toBe("other_name_2");
        expect(category.description).toBe("other_description_2");
    })

    it("should be test active method", () => {
        const category = new Category({ 
            name: "some_name",
            description: "some_description",
            isActive: false,           
        });

        category.active();
        expect(category.isActive).toBeTruthy();
    });

    it("should be test desactive method", () => {
        const category = new Category({ 
            name: "some_name",
            description: "some_description",
            isActive: true,           
        });

        category.desactive();
        expect(category.isActive).toBeFalsy();
    })


})