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

export enum EVacancyType {
    VOLUNTEER = 'VOLUNTEER',
    EMPLOYEE = 'EMPLOYEE',
}

export enum EVacancyStatus {
    REVIEW = 'REVIEW',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
}

export interface IFeedbackVacancy {
    type: EVacancyType;
    applicant_name: string;
    phone: string;
    vacancy: number;
}
