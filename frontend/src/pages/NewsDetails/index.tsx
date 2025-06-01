import { Section } from '@/Components/Section';
import { useQuery } from '@tanstack/react-query';
import { newsQueries } from '@/Shared/api/news.ts';
import { useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { Loader } from '@/Components/Loader';
import { Details } from '@/Components/DetailsTempalates';
import styles from './NewsDetails.module.scss';
import SVG from 'react-inlinesvg';
import { useMobile } from '@/Shared/hooks/useMobile.ts';
import { PATHS } from '@/Shared/consts';

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

    const MobileTitle = () => {
        return (
            <div className={styles.mobileTitle}>
                <button onClick={handleBack}>
                    <SVG src={'/icons/arrow-back-btn.svg'} />
                </button>
                <p>Ко всем новостям</p>
            </div>
        );
    };

    if (!data) return null;

    return (
        <Section title={isMobile ? undefined : title}>
            {isMobile && <MobileTitle />}
            <div className={styles.newWrapper}>
                <Details.Image images={data?.images} />
                {parse(data?.content)}
            </div>
        </Section>
    );
};
