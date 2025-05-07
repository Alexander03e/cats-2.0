import { Section } from '@/Components/Section';
import styles from './ArticleDetails.module.scss';
import { useQuery } from '@tanstack/react-query';
import { historyQueries } from '@/Shared/api/history.ts';
import { useParams } from 'react-router-dom';
import { Loader } from '@/Components/Loader';
import parse from 'html-react-parser';

export const ArticleDetails = () => {
    const { articleId } = useParams();
    const { data, isLoading } = useQuery(historyQueries.detail(articleId!));
    const title = `<span data-accent="true">${data?.title}</span>`;

    if (isLoading) {
        return <Loader />;
    }

    if (!data) return null;

    return (
        <Section title={title}>
            {data?.photo && (
                <div className={styles.imgWrapper}>
                    <img src={data?.photo} />
                </div>
            )}
            <div className={styles.content}>{parse(data?.content)}</div>
        </Section>
    );
};
