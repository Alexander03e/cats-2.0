import styles from './ContactsPage.module.scss';
import SVG from 'react-inlinesvg';
import { useSystemInfo } from '@/Shared/utils/useSystemInfo.ts';
import parsePhoneNumber from 'libphonenumber-js';
import parse from 'html-react-parser';

export const ContactsPage = () => {
    const { data } = useSystemInfo();

    const parsedPhone = data
        ? parsePhoneNumber(`${data?.phone_number}`, 'RU')?.formatNational() || data?.phone_number
        : '';

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
                            <p>{data?.email}</p>
                            <p>{parsedPhone}</p>
                        </div>
                    </div>
                    <div className={styles.workTime}>
                        <h6>контакты</h6>
                        <div className={styles.group}>
                            <p>{parse(data?.calendar_info || '')}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.links}>
                    {!!data?.telegram_link && (
                        <a href={data?.telegram_link} target={'_blank'} rel='noreferrer'>
                            <SVG src={'/icons/tg.svg'} />
                        </a>
                    )}
                    {!!data?.whatsapp_link && (
                        <a href={data?.whatsapp_link} target={'_blank'} rel='noreferrer'>
                            <SVG src={'/icons/viber.svg'} />
                        </a>
                    )}
                    {!!data?.vk_link && (
                        <a href={data?.vk_link} target={'_blank'}>
                            <SVG src={'/icons/vk.svg'} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};
