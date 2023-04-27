import { Entity } from "../../../@seedwork/entity/entity";
import { UniqueEntityId } from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";

export interface CategoryProps {
    name: string;
    description?: string;
    isActive?: boolean;
    created_at?: Date;
}


type UpdateProps = { 
    name?: string;
    description?: string;
}

export default class Category extends Entity<CategoryProps> {
    constructor(public readonly props: CategoryProps, id?: UniqueEntityId) {
        super(props, id)
        this.description = this.props.description ?? null;
        this.isActive = this.isActive ?? true;
        this.props.created_at = this.props.created_at ?? new Date();
    }

    update(props: UpdateProps ) {
        this.description = props?.description || this.description;
        this.name = props?.name || this.name;
    }

    active() {
        this.isActive = true;
    }

    desactive() {
        this.isActive = false;
    }

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

    private set name(value: string) {
        this.props.name = value ?? null;
    }

    private set description(value: string) {
        this.props.description = value ?? null;
    }

    private set isActive(value: boolean) {
        this.props.isActive = value ?? true;
    }
}