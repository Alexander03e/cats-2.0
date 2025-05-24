export interface IHistoryItem {
    id: number;
    title: string;
    photo: string;
    description: string;
    date: string;
    category?: null;
    content: string;
}

export interface ICategory {
    id: number;
    name: string;
    slug: string;
}

export interface IHistoryData {
    results: IHistoryItem[];
    categories: ICategory[];
}
