import styles from './Footer.module.scss';
import { Link } from '@/Components/Link';
import SVG from 'react-inlinesvg';
import { ANCHORS, PATHS } from '@/Shared/consts';
import { useSystemInfo } from '@/Shared/utils/useSystemInfo.ts';
import parsePhoneNumber from 'libphonenumber-js';

export const Footer = () => {
    const { data, isLoading } = useSystemInfo();
    const parsedPhone = data
        ? parsePhoneNumber(`${data?.phone_number}`, 'RU')?.formatNational() || data?.phone_number
        : '';
    if (isLoading) {
        return null;
    }
    return (
        <footer className={styles.wrapper}>
            <div className={styles.grid}>
                <div className={styles.card}>
                    <h6>Свяжитесь с нами</h6>
                    <div className={styles.nav}>
                        {!!data?.email && (
                            <Link
                                href={`mailto:${data.email}`}
                                mode={'html'}
                                icon={<SVG src={'/icons/footer/letter.svg'} />}
                            >
                                {data.email}
                            </Link>
                        )}
                        {!!data?.phone_number && (
                            <Link
                                href={`tel:+${data?.phone_number}`}
                                target={'_blank'}
                                mode={'html'}
                                icon={<SVG src={'/icons/footer/phone-call.svg'} />}
                            >
                                {parsedPhone}
                            </Link>
                        )}
                        {!!data?.telegram_link && (
                            <Link
                                href={data?.telegram_link}
                                target={'_blank'}
                                mode={'html'}
                                icon={<SVG src={'/icons/footer/tg.svg'} />}
                            >
                                Telegram
                            </Link>
                        )}
                        {!!data?.whatsapp_link && (
                            <Link
                                href={data.whatsapp_link}
                                mode={'html'}
                                target={'_blank'}
                                icon={<SVG src={'/icons/footer/wu.svg'} />}
                            >
                                Whats App
                            </Link>
                        )}
                    </div>
                    <div className={styles.bottomContent}>
                        {!!data?.short_calendar_info && (
                            <p>
                                <SVG src={'/icons/footer/clock.svg'} />
                                {data?.short_calendar_info}
                            </p>
                        )}
                    </div>
                </div>
                <div className={styles.card}>
                    <h6>Навигация</h6>
                    <div className={styles.nav}>
                        <Link>О приюте</Link>
                        <Link mode={'react'} href={PATHS.CATS}>
                            Взять котика
                        </Link>
                        <Link mode={'react'} href={PATHS.HISTORY}>
                            Уже дома
                        </Link>
                        <Link mode={'react'} href={PATHS.PROJECTS}>
                            Проекты
                        </Link>
                        <Link mode={'hash'} href={ANCHORS.HELP}>
                            Как помочь
                        </Link>
                    </div>
                </div>
                <div className={styles.card}>
                    <h6>Информация</h6>
                    <div className={styles.nav}>
                        {/*<Link mode={'react'} href={PATHS.ARTICLES}>*/}
                        {/*    Полезные статьи*/}
                        {/*</Link>*/}
                        <Link mode={'react'} href={'vacancy'}>
                            Вакансии
                        </Link>
                        <Link mode={'react'} href={PATHS.NEWS}>
                            Новости
                        </Link>
                        <Link mode={'hash'} href={ANCHORS.FAQ}>
                            FAQ
                        </Link>
                    </div>
                </div>
                <div className={styles.card}>
                    <h6>Социальные сети</h6>
                    <div className={styles.nav}>
                        {!!data?.vk_link && (
                            <Link
                                href={data.vk_link}
                                target={'_blank'}
                                mode={'html'}
                                icon={<SVG src={'/icons/footer/vk.svg'} />}
                            >
                                ВКонтакте
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <Link>Политика конфиденциальности</Link>
                <Link>Разработка сайта</Link>
            </div>
        </footer>
    );
};
