export enum EVacancyStatus {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
}
export interface IVacancyItem {
    id: number;
    title: string;
    description: string;
    status: EVacancyStatus;
    created_at: string;
}
