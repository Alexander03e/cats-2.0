import { Section } from '@/Components/Section';
import styles from './HowToHelp.module.scss';
import { ReactNode } from 'react';
import { Button } from '@/Components/Button';
import { HelpPopup } from '@/Components/HelpPopup';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/Shared/consts';

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
    const navigate = useNavigate();

    const navigateToSupport = () => navigate(PATHS.SUPPORT_MONEY);
    const navigateToDeveloping = () => navigate(PATHS.IN_DEVELOP);

    return (
        <Section title={title} contentClass={styles.content}>
            <Card
                title={'Помочь вещами'}
                desc={
                    'Если у вас есть ненужные вещи, которые нам могут пригодиться, или вы хотите сами выбрать, что отправить, ознакомьтесь со списком нужд.'
                }
                Button={
                    <HelpPopup
                        renderTrigger={({ onClick }) => (
                            <Button onClick={onClick}>Связаться</Button>
                        )}
                    />
                }
            />
            <Card
                title={'Финансовая помощь'}
                desc={
                    'Помогая нам обеспечить животных всем нужным: питанием, ветеринарной помощью и местами для их размещения.'
                }
                Button={<Button onClick={navigateToSupport}>Хочу помочь</Button>}
            />
            <Card
                title={'Перевод по СБП'}
                desc={'Нажмите кнопку отправить, отсканируйте QR код и переведите любую сумму.'}
                Button={<Button onClick={navigateToDeveloping}>Отправить</Button>}
            />
        </Section>
    );
};
