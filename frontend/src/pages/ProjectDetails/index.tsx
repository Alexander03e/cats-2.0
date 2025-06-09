import { Details } from '@/Components/DetailsTempalates';
import styles from './ProjectDetails.module.scss';
import { Progress } from '@/Components/Progress';
import { useQuery } from '@tanstack/react-query';
import { projectQueries } from '@/Shared/api/projects.ts';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Loader } from '@/Components/Loader';
import QRCode from 'react-qr-code';
import parse from 'html-react-parser';
// const howToDonate = [
//     '1. переведи по номеру ххххххххххх (Фамилия И.О.)',
//     '2. нажми кнопку "Пожертвовать" в начале страницы',
//     '3. отсканируй QR код и переведи удобную сумму',
//     '4. мы с радостью примем строительные материалы',
// ];

export const ProjectDetails = () => {
    const { projectId } = useParams();

    const { data, isLoading } = useQuery(projectQueries.detail(projectId!));

    if (isLoading) {
        return <Loader />;
    }

    if (!data) return null;

    const QR_URL = window.location.href + '/donate/';

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
                    {/*{!!data?.for_what && (*/}
                    {/*    <div className={styles.group}>*/}
                    {/*        <h6>Для чего нужен кабинет</h6>*/}
                    {/*        <p>{data?.for_what}</p>*/}
                    {/*    </div>*/}
                    {/*)}*/}

                    <div
                        style={!data?.details ? { justifyContent: 'center' } : {}}
                        className={styles.body}
                    >
                        {data?.details && (
                            <div className={styles.left}>
                                <div className={styles.details}>{parse(data.details)}</div>
                            </div>
                        )}

                        <div className={styles.right}>
                            <div className={styles.qr}>
                                <QRCode
                                    bgColor={'transparent'}
                                    fgColor={'rgba(103, 97, 205, 1)'}
                                    value={QR_URL}
                                />
                            </div>
                            <p className={styles.qrText}>
                                Мы создали отдельный счет для проекта. Отсканируйте QR код, либо
                                перейдите по{' '}
                                <a target={'_blank'} href={window.location.href + `/donate`}>
                                    этой ссылке
                                </a>
                                и переведите удобную для вас сумму
                            </p>
                        </div>
                    </div>
                </div>
            </Details.Bottom>
        </Details>
    );
};
