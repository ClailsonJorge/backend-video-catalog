import { UniqueEntityId } from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";

export interface CategoryProps {
    name: string;
    description?: string;
    isActive?: boolean;
    created_at?: Date;
}

/**
 * This class represent the category class.
 * it will be use to rank the movies.
 * @class
 */

export default class Category {
    public readonly id: UniqueEntityId;

    constructor(public readonly props: CategoryProps, id?: UniqueEntityId) {
        this.id = id || new UniqueEntityId();
        this.description = this.props.description ?? null;
        this.isActive = this.isActive ?? true;
        this.props.created_at = this.props.created_at ?? new Date();
    }

    /**
     * This method return the name of object
     * @return {string} - The string has the name of object.
     */
    
    get name() {
        return this.props.name;
    }

    get description() {
        return this.props.description;
    }

    get isActive() {
        return this.props.isActive;
    }

    get created_at() {
        return this.props.created_at;
    }

    private set description(value: string) {
        this.props.description = value ?? null;
    }

    private set isActive(value: boolean) {
        this.props.isActive = value ?? true;
    }
}