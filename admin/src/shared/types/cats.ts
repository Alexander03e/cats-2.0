import { IFilterItem } from '@/Components/Filters';

export enum EHealthStatus {
    HEALTHY = 'HEALTHY',
    SICK = 'SICK',
    RECOVERING = 'RECOVERING',
}

export enum EGender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

export enum ECatStatus {
    AVAILABLE = 'AVAILABLE',
    ADOPTED = 'ADOPTED',
    RESERVED = 'RESERVED',
    QUARANTINE = 'QUARANTINE',
    UNAVAILABLE = 'UNAVAILABLE',
}

export enum ECatApplicationStatus {
    NEW = 'NEW',
    IN_REVIEW = 'IN_REVIEW',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
}

export interface ICatListItem {
    id: number;
    name: string;
    short_description: string;
    breed: string;
    color: string;
    age: number;
    health_status: EHealthStatus;
    attributes: string[];
    left_at: string;
    status: ECatStatus;
    description: string;
    photos: string[];
    gender: EGender;
    diagnosis: string;
}

export interface ICatsData {
    results: ICatListItem[];
    filters: Record<string, IFilterItem>;
}

export interface ITakeCat {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    consent?: boolean;
}

export interface ICatApplication {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    consent?: boolean;
    status: ECatApplicationStatus;
}
