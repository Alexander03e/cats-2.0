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
    status: ECatStatus;
    description: string;
    photo: string;
    gender: EGender;
    diagnosis: string;
}
