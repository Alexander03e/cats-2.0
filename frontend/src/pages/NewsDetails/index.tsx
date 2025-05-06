import { Section } from '@/Components/Section';
import { useQuery } from '@tanstack/react-query';
import { newsQueries } from '@/Shared/api/news.ts';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { Loader } from '@/Components/Loader';

export const NewsDetails = () => {
    const { newId } = useParams();
    const { data, isLoading } = useQuery(newsQueries.detail(newId!));

    const title = `<span data-accent="true">${data?.title}</span>`;

    if (isLoading) {
        return <Loader />;
    }

    if (!data) return null;

    return <Section title={title}>{parse(data?.content)}</Section>;
};
