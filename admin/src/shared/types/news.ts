export interface INewsItem {
    id: number;
    title: string;
    content: string;
    date: string;
    cover_image: string;
    cover_image_url: string;
    images?: string[];
}
