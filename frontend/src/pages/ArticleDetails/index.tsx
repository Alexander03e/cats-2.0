import { Section } from '@/Components/Section';
import styles from './ArticleDetails.module.scss';

export const ArticleDetails = () => {
    const title = '<span data-accent="true">Название статьи</span>';

    return (
        <Section title={title}>
            <div className={styles.content}>text</div>
        </Section>
    );
};
