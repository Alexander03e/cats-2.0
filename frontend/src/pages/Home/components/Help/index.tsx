import styles from './Help.module.scss';
import { Section } from '@/Components/Section';
import cn from 'classnames';
import { Button } from '@/Components/Button';
import { ANCHORS, PATHS } from '@/Shared/consts';
import { useNavigate } from 'react-router-dom';
import { useMobile } from '@/Shared/hooks/useMobile.ts';

export const Help = () => {
    const title = 'Как нам можно <span data-accent="true">помочь?</span>';
    const isMobile = useMobile();

    const navigate = useNavigate();

    const navigateToHelp = () => {
        navigate(PATHS.HELP);
    };

    return (
        <Section id={ANCHORS.HELP} contentClass={styles.grid} title={title}>
            <div className={styles.mainImg}>
                <img src={'/images/kitty-flower.png'} />
            </div>
            <div className={styles.subgrid}>
                <div
                    className={cn(styles.gridItem, {
                        [styles.money]: isMobile,
                        [styles.take]: !isMobile,
                    })}
                >
                    <div className={styles.top}>
                        <h5>Забрать питомца домой</h5>
                        <p>Стать хозяином и открыть свой дом для четвероногого друга</p>
                    </div>
                    <Button
                        onClick={() => navigate(PATHS.CATS)}
                        variant={isMobile ? 'yellow' : 'blue'}
                        size={'small'}
                    >
                        Выбрать питомца
                    </Button>
                </div>
                <div className={cn(styles.gridItem, styles.money)}>
                    <div className={styles.top}>
                        <h5>Помочь финансово</h5>
                        <p>
                            Помогая нам обеспечить животных всем нужным: питанием, ветеринарной
                            помощью и местами для их размещения.
                        </p>
                    </div>

                    <Button onClick={navigateToHelp} variant={'yellow'} size={'small'}>
                        Хочу помочь
                    </Button>
                </div>
                <div className={cn(styles.gridItem, styles.stuff)}>
                    <div className={styles.top}>
                        <h5>Помочь вещами</h5>
                        <p>
                            Если у вас есть ненужные вещи, которые нам могут пригодиться, или вы
                            хотите сами выбрать, что отправить, ознакомьтесь со списком нужд.
                        </p>
                    </div>
                    <Button onClick={navigateToHelp} variant={'yellow'} size={'small'}>
                        Хочу помочь
                    </Button>
                </div>
                <div className={cn(styles.gridItem, styles.question)}>
                    <div className={styles.top}>
                        <h5>У вас есть вопрос?</h5>
                        <p>
                            Если у вас есть вопросы о поддержке животных или нашей организации, не
                            стесняйтесь связаться с нами.
                        </p>
                    </div>
                    <Button onClick={() => navigate(PATHS.CONTACTS)} size={'small'}>
                        Связаться
                    </Button>
                </div>
            </div>
        </Section>
    );
};
