import styles from './ContactsPage.module.scss';
import SVG from 'react-inlinesvg';

export const ContactsPage = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.mainImg}>
                <img src={'/images/kitty-contacts.png'} />
            </div>
            <div className={styles.info}>
                <div className={styles.top}>
                    <div className={styles.contacts}>
                        <h6>контакты</h6>
                        <div className={styles.group}>
                            <p>kotodom_official@icloud.com</p>
                            <p>8(902)-323-53-50</p>
                        </div>
                    </div>
                    <div className={styles.workTime}>
                        <h6>контакты</h6>
                        <div className={styles.group}>
                            <p>пн-пт с 9:00 до 20:00</p>
                            <p>сб-вс с 9:00 до 17:00</p>
                        </div>
                    </div>
                </div>

                <div className={styles.links}>
                    <a href={'https://t.me/kotodom_samara'} target={'_blank'} rel='noreferrer'>
                        <SVG src={'/icons/tg.svg'} />
                    </a>
                    <SVG src={'/icons/viber.svg'} />
                    <a href={'https://vk.com/priutsamara'} target={'_blank'}>
                        <SVG src={'/icons/vk.svg'} />
                    </a>
                </div>
            </div>
        </div>
    );
};
