import { Details } from '@/Components/DetailsTempalates';
import styles from './ProjectDetails.module.scss';
import { Progress } from '@/Components/Progress';
import { useQuery } from '@tanstack/react-query';
import { projectQueries } from '@/Shared/api/projects.ts';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Loader } from '@/Components/Loader';
import map from 'lodash/map';
import QRCode from 'react-qr-code';
import size from 'lodash/size';

const howToDonate = [
    '1. переведи по номеру ххххххххххх (Фамилия И.О.)',
    '2. нажми кнопку "Пожертвовать" в начале страницы',
    '3. отсканируй QR код и переведи удобную сумму',
    '4. мы с радостью примем строительные материалы',
];

export const ProjectDetails = () => {
    const { projectId } = useParams();

    const { data, isLoading } = useQuery(projectQueries.detail(projectId!));

    if (isLoading) {
        return <Loader />;
    }

    if (!data) return null;

    return (
        <Details>
            <Details.Image images={[data?.cover_image || '/images/mock-cat.png']} />
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
                    {!!data?.for_what && (
                        <div className={styles.group}>
                            <h6>Для чего нужен кабинет</h6>
                            <p>{data?.for_what}</p>
                        </div>
                    )}

                    <div className={styles.body}>
                        <div className={styles.left}>
                            {size(data?.spending_list) > 0 && (
                                <div className={styles.group}>
                                    <h6>На что пойдут средства</h6>
                                    <div className={styles.spending}>
                                        {map(data?.spending_list, item => {
                                            return <p key={item}>{item}</p>;
                                        })}
                                    </div>
                                </div>
                            )}
                            <div className={styles.group}>
                                <h6>Как поддержать проект</h6>
                                <div className={styles.spending}>
                                    {map(howToDonate, item => {
                                        return <p key={item}>{item}</p>;
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className={styles.right}>
                            <div className={styles.qr}>
                                <QRCode
                                    bgColor={'transparent'}
                                    fgColor={'rgba(103, 97, 205, 1)'}
                                    value={'qr'}
                                />
                            </div>
                            <p className={styles.qrText}>
                                Мы создали отдельный счет для проекта. Отсканируйте QR код и
                                переведите удобную для вас сумму
                            </p>
                        </div>
                    </div>
                </div>
            </Details.Bottom>
        </Details>
    );
};
