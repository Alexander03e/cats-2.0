import { Details } from '@/Components/DetailsTempalates';
import styles from './ProjectDetails.module.scss';
import { Progress } from '@/Components/Progress';

export const ProjectDetails = () => {
    return (
        <Details>
            <Details.Image images={['/images/mock-cat.png']} />
            <Details.Info className={styles.info} title={'Project name'}>
                <div className={styles.content}>
                    <p>
                        Красота — сиюминутная вечность. Но красотой Рири вы будете наслаждаться не
                        одно мгновение, а всю жизнь! Каждое утро, просыпаясь, видеть пушистые щёчки
                        и огненные глазки, а ложась в постель, слышать тёплое мурчание. Вы будете
                        объяты красотой и любовью! Приезжайте, знакомьтесь с Рири и забирайте её
                        домой
                    </p>

                    <div className={styles.progress}>
                        <Progress
                            size={'large'}
                            suffix={'₽'}
                            total={100000}
                            current={60000}
                            bottomSlot={
                                <div className={styles.progressBottom}>
                                    <div className={styles.date}>
                                        <h6>xx.xx.xxxx</h6>
                                        <p>Опубликован</p>
                                    </div>
                                    <div className={styles.date}>
                                        <h6>xx.xx.xxxx</h6>
                                        <p>Опубликован</p>
                                    </div>
                                </div>
                            }
                        />
                    </div>
                </div>
            </Details.Info>
            <Details.Bottom noStyle>
                <div className={styles.bottomContent}>
                    <div className={styles.group}>
                        <h6>Для чего нужен кабинет</h6>
                        <p>
                            Кабинет необходим для животных с кожными заболеваниями. К сожалению,
                            животные с ослабленным иммунитетом часто им подвержены. Любой пациент
                            должен находиться в отдельной клетке, но сейчас у каждого есть минимум 3
                            соседа. И это усложняет процесс выздоровления.
                        </p>
                    </div>

                    <div className={styles.group}>
                        <h6>На что пойдут средства</h6>
                    </div>
                    <div className={styles.group}>
                        <h6>Как поддержать проект</h6>
                    </div>
                </div>
            </Details.Bottom>
        </Details>
    );
};
