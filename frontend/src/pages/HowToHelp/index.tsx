import { Section } from '@/Components/Section';
import styles from './HowToHelp.module.scss';
import { ReactNode } from 'react';
import { Button } from '@/Components/Button';

interface ICardProps {
    title: string;
    desc: string;
    Button: ReactNode;
}
const Card = ({ Button, desc, title }: ICardProps) => {
    return (
        <div className={styles.card}>
            <h6>{title}</h6>
            <p>{desc}</p>
            {Button}
        </div>
    );
};

export const HowToHelp = () => {
    const title = 'Как нам можно <span data-accent="true">помочь?</span>';

    return (
        <Section title={title} contentClass={styles.content}>
            <Card
                title={'Помочь вещами'}
                desc={
                    'Корм, лекарства, наполнители, пелёнки и так далее.\n' +
                    '\n' +
                    'Полный список нужд можете уточнить у администратора.'
                }
                Button={<Button>Связаться</Button>}
            />
            <Card
                title={'Финансовая помощь'}
                desc={
                    'Помогая нам обеспечить питомцев всем необходимым: кормом, ветеринарными услугами и местами для их пристройства.'
                }
                Button={<Button>Хочу помочь</Button>}
            />
            <Card
                title={'Перевод по СБП'}
                desc={'Нажмите кнопку отправить, отсканируйте QR код и переведите любую сумму.'}
                Button={<Button>Отправить</Button>}
            />
        </Section>
    );
};
