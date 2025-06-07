import { EProjectStatus } from '@/Shared/types/projects.ts';
import { Tag } from 'antd';

export const getProjectStatus = (status: EProjectStatus) => {
    const translate = getProjectTranslate(status);
    switch (status) {
        case EProjectStatus.ACTIVE:
            return <Tag color={'warning'}>{translate}</Tag>;
        case EProjectStatus.END:
            return <Tag color={'success'}>{translate}</Tag>;
        case EProjectStatus.SOON:
            return <Tag color={'geekblue'}>{translate}</Tag>;
        default:
            return <Tag>{translate}</Tag>;
    }
};

export const getProjectTranslate = (status: EProjectStatus) => {
    switch (status) {
        case EProjectStatus.ACTIVE:
            return 'Активный';
        case EProjectStatus.END:
            return 'Завершен';
        case EProjectStatus.SOON:
            return 'В планах';
        default:
            return status;
    }
};
