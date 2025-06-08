export enum EProjectStatus {
    SOON = 'SOON',
    ACTIVE = 'ACTIVE',
    END = 'END',
}

export interface IProjectItem {
    id: number;
    title: string;
    description: string;
    details: string;
    for_what?: string;
    goal_amount: string;
    current_amount: string;
    status: EProjectStatus;
    cover_image?: string;
    created_at: string;
    spending_list?: string[];
}

export enum EDonationStatus {
    SUCCESS = 'SUCCESS',
    PENDING = 'PENDING',
    FAILED = 'FAILED',
}

export interface IDonationItem {
    id: number;
    amount: string;
    donor_name: string;
    status: EDonationStatus;
    message: string;
    date: string;
    project: number;
}
