import { Details } from '@/Components/DetailsTempalates';
import styles from './ProjectDetails.module.scss';
import { Progress } from '@/Components/Progress';
import { useQuery } from '@tanstack/react-query';
import { projectQueries } from '@/Shared/api/projects.ts';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

export const ProjectDetails = () => {
    const { projectId } = useParams();

    const { data } = useQuery(projectQueries.detail(projectId!));

    return (
        <Details>
            <Details.Image images={['/images/mock-cat.png']} />
            <Details.Info className={styles.info} title={data?.title}>
                <div className={styles.content}>
                    <p>{data?.description}</p>

                    <div className={styles.progress}>
                        <Progress
                            size={'large'}
                            suffix={'₽'}
                            total={parseFloat(String(data?.goal_amount))}
                            current={parseFloat(String(data?.current_amount))}
                            bottomSlot={
                                <div className={styles.progressBottom}>
                                    {/*<div className={styles.date}>*/}
                                    {/*    <h6>xx.xx.xxxx</h6>*/}
                                    {/*    <p>Опубликован</p>*/}
                                    {/*</div>*/}
                                    <div className={styles.date}>
                                        <h6>{dayjs(data?.created_at).format('DD.MM.YYYY')}</h6>
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
