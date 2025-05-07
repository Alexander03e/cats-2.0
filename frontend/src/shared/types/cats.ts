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

export interface ICatListItem {
    id: number;
    name: string;
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
}

export interface ITakeCat {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    consent?: boolean;
}
