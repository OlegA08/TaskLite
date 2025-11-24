export type Task = {
    readonly id: string;
    title: string;
    description?: string;
    created: Date;
    complete: boolean;
};