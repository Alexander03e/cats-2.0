import { Section } from '@/Components/Section';
import { useQuery } from '@tanstack/react-query';
import { newsQueries } from '@/Shared/api/news.ts';
import { useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { Loader } from '@/Components/Loader';
import { Details } from '@/Components/DetailsTempalates';
import styles from './NewsDetails.module.scss';
import { useMobile } from '@/Shared/hooks/useMobile.ts';
import { PATHS } from '@/Shared/consts';
import { MobileTitle } from '@/Components/MobileSectionTitle';

export const NewsDetails = () => {
    const { newId } = useParams();
    const isMobile = useMobile();
    const navigate = useNavigate();
    const { data, isLoading } = useQuery(newsQueries.detail(newId!));

    const title = `<span data-accent="true">${data?.title}</span>`;

    const handleBack = () => {
        navigate(PATHS.NEWS);
    };

    if (isLoading) {
        return <Loader />;
    }

    if (!data) return null;

    return (
        <Section title={isMobile ? undefined : title}>
            {isMobile && (
                <MobileTitle
                    className={styles.mobileTitle}
                    onBack={handleBack}
                    title={'Ко всем новостям'}
                />
            )}
            <div className={styles.newWrapper}>
                <Details.Image images={data?.images} />
                <div className={styles.contentWrapper}>{parse(data?.content)}</div>
            </div>
        </Section>
    );
};
