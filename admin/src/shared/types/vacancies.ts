export enum EVacancyOpenedStatus {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
}

export interface IVacancyItem {
    id: number;
    title: string;
    description: string;
    status: EVacancyStatus;
    image: any;
    created_at: string;
}

export interface IVacancyAppointment {
    id: number;
    type: EVacancyType;
    applicant_name: string;
    status: EVacancyStatus;
    phone: string;
    date: string;
    vacancy: number;
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
