import { Section } from '@/Components/Section';
import { useQuery } from '@tanstack/react-query';
import { newsQueries } from '@/Shared/api/news.ts';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

export const NewsDetails = () => {
    const { newId } = useParams();
    const { data } = useQuery(newsQueries.detail(newId!));

    const title = `<span data-accent="true">${data?.title}</span>`;

    if (!data) return null;

    return <Section title={title}>{parse(data?.content)}</Section>;
};
