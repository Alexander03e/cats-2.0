export interface ISystemInfo {
    id: number;
    address: string;
    phone_number: string;
    email: string;
    vk_link: string;
    telegram_link: string;
    instagram_link: string | null;
    whatsapp_link: string;
    calendar_info: string;
    short_calendar_info: string;
    created_at?: string;
    updated_at?: string;
}
