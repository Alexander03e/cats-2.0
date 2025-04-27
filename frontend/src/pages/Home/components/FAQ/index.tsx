import styles from './FAQ.module.scss';
import { Section } from '@/Components/Section';
import { faqData } from '@/Pages/Home/components/FAQ/consts.ts';
import map from 'lodash/map';
import { FaqItem } from '@/Components/FaqItem';
import { ANCHORS } from '@/Shared/consts';

export const FAQ = () => {
    const title = 'Ответы <span data-accent="true">на частые вопросы</span>';

    return (
        <Section id={ANCHORS.FAQ} title={title}>
            <div className={styles.wrapper}>
                {map(faqData, (item, index) => (
                    <FaqItem key={`faq-item-${index}`} {...item} />
                ))}
            </div>
        </Section>
    );
};
