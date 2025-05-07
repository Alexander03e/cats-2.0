export enum EProjectStatus {
    SOON = 'soon',
    ACTIVE = 'active',
    END = 'end',
}

export interface IProjectItem {
    id: number;
    title: string;
    description: string;
    goal_amount: string;
    current_amount: string;
    status: EProjectStatus;
    cover_image?: string;
    created_at: string;
    spending_list?: string[];
}
