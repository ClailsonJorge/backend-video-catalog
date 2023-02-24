export interface CategoryProps {
    name: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
}

export default class Category {

    constructor(public readonly props: CategoryProps) {
    }
}