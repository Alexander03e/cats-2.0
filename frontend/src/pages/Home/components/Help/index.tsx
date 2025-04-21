import styles from './Help.module.scss';
import { Section } from '@/Components/Section';
import cn from 'classnames';
import { Button } from '@/Components/Button';

export const Help = () => {
    const title = 'Как нам можно <span data-accent="true">помочь?</span>';

    return (
        <Section contentClass={styles.grid} title={title}>
            <div className={styles.mainImg}>
                <img src={'/images/kitty-flower.png'} />
            </div>
            <div className={styles.subgrid}>
                <div className={cn(styles.gridItem, styles.take)}>
                    <div className={styles.top}>
                        <h5>Забрать питомца домой</h5>
                        <p>Стать хозяином и открыть свой дом для четвероногого друга</p>
                    </div>
                    <Button variant={'blue'} size={'small'}>
                        Выбрать питомца
                    </Button>
                </div>
                <div className={cn(styles.gridItem, styles.money)}>
                    <div className={styles.top}>
                        <h5>Помочь финансово</h5>
                        <p>Стать хозяином и открыть свой дом для четвероногого друга</p>
                    </div>

                    <Button variant={'yellow'} size={'small'}>
                        Хочу помочь
                    </Button>
                </div>
                <div className={cn(styles.gridItem, styles.stuff)}>
                    <div className={styles.top}>
                        <h5>Помочь вещами</h5>
                        <p>Стать хозяином и открыть свой дом для четвероногого друга</p>
                    </div>
                    <Button variant={'yellow'} size={'small'}>
                        Хочу помочь
                    </Button>
                </div>
                <div className={cn(styles.gridItem, styles.question)}>
                    <div className={styles.top}>
                        <h5>У вас есть вопрос?</h5>
                        <p>Стать хозяином и открыть свой дом для четвероногого друга</p>
                    </div>
                    <Button size={'small'}>Связаться</Button>
                </div>
            </div>
        </Section>
    );
};
