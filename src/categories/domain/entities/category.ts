export interface CategoryProps {
    name: string;
    description?: string;
    isActive?: boolean;
    created_at?: Date;
}

export default class Category {
    constructor(public readonly props: CategoryProps) {
        this.description = this.props.description ?? null;
        this.isActive = this.isActive ?? true;
        this.props.created_at = this.props.created_at ?? new Date();
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

    private set description(value: string) {
        this.props.description = value ?? null;
    }

    private set isActive(value: boolean) {
        this.props.isActive = value ?? true;
    }
}