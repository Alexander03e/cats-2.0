import styles from './Footer.module.scss';
import { Link } from '@/Components/Link';
import SVG from 'react-inlinesvg';

export const Footer = () => {
    return (
        <div className={styles.wrapper}>
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
                        <Link>Взять котика</Link>
                        <Link>Уже дома</Link>
                        <Link>Проекты</Link>
                        <Link>Как помочь</Link>
                    </div>
                </div>
                <div className={styles.card}>
                    <h6>Информация</h6>
                    <div className={styles.nav}>
                        <Link>Полезные статьи</Link>
                        <Link mode={'react'} href={'vacancy'}>
                            Вакансии
                        </Link>
                        <Link>Новости</Link>
                        <Link>FAQ</Link>
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
        </div>
    );
};
