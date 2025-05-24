import styles from './Footer.module.scss';
import { Link } from '@/Components/Link';
import SVG from 'react-inlinesvg';
import { ANCHORS, PATHS } from '@/Shared/consts';

export const Footer = () => {
    return (
        <footer className={styles.wrapper}>
            <div className={styles.grid}>
                <div className={styles.card}>
                    <h6>Свяжитесь с нами</h6>
                    <div className={styles.nav}>
                        <Link icon={<SVG src={'/icons/footer/letter.svg'} />}>kotodom@mail.ru</Link>
                        <Link icon={<SVG src={'/icons/footer/phone-call.svg'} />}>
                            +7 999 999-99-99
                        </Link>
                        <Link icon={<SVG src={'/icons/footer/tg.svg'} />}>Telegram</Link>
                        <Link icon={<SVG src={'/icons/footer/wu.svg'} />}>Whats App</Link>
                    </div>
                    <div className={styles.bottomContent}>
                        <p>
                            <SVG src={'/icons/footer/clock.svg'} />
                            Ежедневно 11:00-20:00
                        </p>
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
                        <Link mode={'react'} href={PATHS.ARTICLES}>
                            Полезные статьи
                        </Link>
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
                        <Link icon={<SVG src={'/icons/footer/vk.svg'} />}>ВКонтакте</Link>
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
